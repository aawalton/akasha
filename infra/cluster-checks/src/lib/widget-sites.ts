import { assertNever } from "@shared/utils-narrow/assert-never"
import { z } from "zod"

export const WIDGET_SOURCE_GLOBS: readonly string[] = [
  "../akasha/**/ios-widget/**/*.swift",
  "../akasha/akasha/code-system/ios-component/ios-components/**/*.swift",
]

export const WIDGET_SOURCE_GLOB = WIDGET_SOURCE_GLOBS.join(" and ")

export const SPACING_SWIFT_BASENAME = "Spacing.swift"

export const WIDGET_SEAM_GLOB = "../akasha/native-shell/*/scripts/apply-ios-seam.sh"

export interface WidgetSite {
  readonly dir: string
  readonly sources: readonly string[]
}

export interface WidgetScopeDeclaration {
  readonly dir: string
  readonly reason: string
}

export const WIDGETS_OUTSIDE_THE_SCALE: readonly WidgetScopeDeclaration[] = []

export interface WidgetScopeViolation {
  readonly message: string
  readonly reason:
    | "widget-unjudged"
    | "shared-scale-unresolved"
    | "declaration-orphaned"
    | "declaration-expired"
    | "scale-site-missing"
  readonly at: string
}

export interface SeamJoin {
  readonly extensionDir: string
  readonly sharedDir: string
}

export interface SeamScript {
  readonly path: string
  readonly text: string
}

export type WidgetDisposition =
  | { readonly kind: "states-scale" }
  | { readonly kind: "takes-scale-from"; readonly extensions: readonly string[] }
  | { readonly kind: "declared-out"; readonly reason: string }
  | {
      readonly kind: "unjudged"
      readonly hosts: readonly string[]
      readonly hostsWithoutScale: readonly string[]
    }

export function deriveWidgetSites(swiftPaths: readonly string[]): readonly WidgetSite[] {
  const byDir = new Map<string, string[]>()
  for (const path of swiftPaths) {
    const cut = path.lastIndexOf("/")
    if (cut <= 0) continue
    const dir = path.slice(0, cut)
    const bucket = byDir.get(dir)
    if (bucket === undefined) byDir.set(dir, [path])
    else bucket.push(path)
  }
  return [...byDir]
    .map(([dir, sources]) => ({ dir, sources: [...sources].sort() }))
    .sort((a, b) => a.dir.localeCompare(b.dir))
}

export function statesOwnScale(site: WidgetSite): boolean {
  return site.sources.includes(`${site.dir}/${SPACING_SWIFT_BASENAME}`)
}

const WIDGET_SRC_RE = /^WIDGET_SRC_DIR="(?<dir>[^"]*)"/m
const SHARED_WIDGET_SRC_RE = /^SHARED_WIDGET_SRC_DIR="(?<dir>[^"]*)"/m

const SeamDirectory = z.object({ dir: z.string().min(1) })

function parseSeamDirectory(match: RegExpExecArray | null): string | undefined {
  const parsed = SeamDirectory.safeParse(match?.groups)
  return parsed.success ? parsed.data.dir : undefined
}

function resolveAgainst(base: string, relative: string): string {
  const segments = base === "" ? [] : base.split("/")
  for (const part of relative.split("/")) {
    if (part === "" || part === ".") continue
    if (part === "..") {
      segments.pop()
      continue
    }
    segments.push(part)
  }
  return segments.join("/")
}

export function deriveSeamJoins(scripts: readonly SeamScript[]): readonly SeamJoin[] {
  const joins: SeamJoin[] = []
  for (const script of scripts) {
    const base = script.path.split("/").slice(0, -2).join("/")
    const widgetSrc = parseSeamDirectory(WIDGET_SRC_RE.exec(script.text))
    const sharedSrc = parseSeamDirectory(SHARED_WIDGET_SRC_RE.exec(script.text))
    if (widgetSrc === undefined || sharedSrc === undefined) continue
    joins.push({
      extensionDir: resolveAgainst(base, widgetSrc),
      sharedDir: resolveAgainst(base, sharedSrc),
    })
  }
  return [...joins].sort(
    (a, b) => a.sharedDir.localeCompare(b.sharedDir) || a.extensionDir.localeCompare(b.extensionDir)
  )
}

export function coversDir(sharedDir: string, dir: string): boolean {
  return dir === sharedDir || dir.startsWith(`${sharedDir}/`)
}

export function disposeWidgetSites(args: {
  readonly sites: readonly WidgetSite[]
  readonly joins: readonly SeamJoin[]
  readonly declarations: readonly WidgetScopeDeclaration[]
}): ReadonlyMap<string, WidgetDisposition> {
  const declared = new Map(args.declarations.map((d) => [d.dir, d]))
  const scaleSites = new Set(args.sites.filter(statesOwnScale).map((site) => site.dir))
  const out = new Map<string, WidgetDisposition>()

  for (const site of args.sites) {
    if (scaleSites.has(site.dir)) {
      out.set(site.dir, { kind: "states-scale" })
      continue
    }
    const hosts = args.joins
      .filter((join) => coversDir(join.sharedDir, site.dir))
      .map((join) => join.extensionDir)
      .sort()
    const hostsWithoutScale = hosts.filter((host) => !scaleSites.has(host))
    if (hosts.length > 0 && hostsWithoutScale.length === 0) {
      out.set(site.dir, { kind: "takes-scale-from", extensions: hosts })
      continue
    }
    const declaration = declared.get(site.dir)
    if (declaration !== undefined) {
      out.set(site.dir, { kind: "declared-out", reason: declaration.reason })
      continue
    }
    out.set(site.dir, { kind: "unjudged", hosts, hostsWithoutScale })
  }
  return out
}

export function isJudged(
  disposition: WidgetDisposition
): disposition is Extract<WidgetDisposition, { kind: "states-scale" | "takes-scale-from" }> {
  return disposition.kind === "states-scale" || disposition.kind === "takes-scale-from"
}

export function judgeWidgetScope(args: {
  readonly sites: readonly WidgetSite[]
  readonly joins: readonly SeamJoin[]
  readonly declarations: readonly WidgetScopeDeclaration[]
}): readonly WidgetScopeViolation[] {
  const byDir = new Map(args.sites.map((site) => [site.dir, site]))
  const dispositions = disposeWidgetSites(args)
  const violations: WidgetScopeViolation[] = []

  if (!args.sites.some(statesOwnScale)) {
    violations.push({
      message: `no widget directory in the tree holds a ${SPACING_SWIFT_BASENAME}; the scale has no native side left to be compared against, so this run can certify nothing about it`,
      reason: "scale-site-missing",
      at: WIDGET_SOURCE_GLOB,
    })
  }

  for (const [dir, disposition] of dispositions) {
    if (disposition.kind !== "unjudged") continue
    if (disposition.hostsWithoutScale.length > 0) {
      violations.push({
        message: `${dir} holds shared widget sources copied into ${disposition.hostsWithoutScale.join(", ")}, and ${disposition.hostsWithoutScale.length === 1 ? "that extension states" : "those extensions state"} no ${SPACING_SWIFT_BASENAME}; a step named in shared Swift would not resolve there, so this directory cannot be held to the scale until it does`,
        reason: "shared-scale-unresolved",
        at: dir,
      })
      continue
    }
    violations.push({
      message: `${dir} holds widget sources and this check neither judges it against the spacing scale nor says why it does not; give it a ${SPACING_SWIFT_BASENAME}, or have a shell's ${WIDGET_SEAM_GLOB.split("/").pop()} copy it into extensions that state one, or add a WIDGETS_OUTSIDE_THE_SCALE row saying what a green here does not speak for`,
      reason: "widget-unjudged",
      at: dir,
    })
  }

  for (const declaration of args.declarations) {
    const site = byDir.get(declaration.dir)
    if (site === undefined) {
      violations.push({
        message: `WIDGETS_OUTSIDE_THE_SCALE holds a row for ${declaration.dir} and no widget source is there; the declaration has outlived what it described and should be removed`,
        reason: "declaration-orphaned",
        at: declaration.dir,
      })
      continue
    }
    const disposition = dispositions.get(declaration.dir)
    if (disposition !== undefined && isJudged(disposition)) {
      violations.push({
        message:
          disposition.kind === "states-scale"
            ? `WIDGETS_OUTSIDE_THE_SCALE says ${declaration.dir} stands outside the scale and it now holds ${SPACING_SWIFT_BASENAME}; the reason has stopped being true, so either drop the row or write it again for the reason that holds now`
            : `WIDGETS_OUTSIDE_THE_SCALE says ${declaration.dir} stands outside the scale and it is now copied into ${disposition.extensions.join(", ")}, every one of which states the scale; a step named here resolves, so the row describes nothing and should be dropped`,
        reason: "declaration-expired",
        at: declaration.dir,
      })
    }
  }

  return violations.sort((a, b) => a.at.localeCompare(b.at))
}

export function describeWidgetScope(args: {
  readonly sites: readonly WidgetSite[]
  readonly joins: readonly SeamJoin[]
  readonly declarations: readonly WidgetScopeDeclaration[]
  readonly scannedSources: ReadonlyMap<string, number>
}): string {
  const dispositions = disposeWidgetSites(args)
  const lines: string[] = []
  for (const site of args.sites) {
    const disposition = dispositions.get(site.dir)
    const scanned = args.scannedSources.get(site.dir) ?? 0
    if (disposition === undefined) continue
    switch (disposition.kind) {
      case "states-scale":
        lines.push(
          `Judged against the scale, and states it: ${site.dir} — ${scanned} source(s) scanned for literals, ${SPACING_SWIFT_BASENAME} excluded as the side the numbers belong in.`
        )
        break
      case "takes-scale-from":
        lines.push(
          `Judged against the scale, which it takes from ${disposition.extensions.join(", ")}: ${site.dir} — ${scanned} source(s) scanned for literals.`
        )
        break
      case "declared-out":
        lines.push(
          `Not judged, declared out: ${site.dir}, ${site.sources.length} source(s) — ${disposition.reason}.`
        )
        break
      case "unjudged":
        lines.push(
          `NOT JUDGED and not declared out: ${site.dir}, ${site.sources.length} source(s).`
        )
        break
      default:
        assertNever(disposition)
    }
  }
  return lines.join("\n")
}
