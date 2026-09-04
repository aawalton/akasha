#!/usr/bin/env bun

import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import ts from "typescript"
import { parseArgs, STANDARD_FLAGS } from "../../modules/cli-args/cli-args.module.code.ts"
import {
  examinePopulation,
  type Population,
} from "../../modules/population/population.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import {
  collectTypeFamilyEdges,
  collectXmlColonCalls,
  resolveControlFamily,
  scanTstlThisVoidSelfDrop,
  type TstlThisVoidSelfDropFinding,
} from "../../modules/ts-tstl-this-void-self-drop/ts-tstl-this-void-self-drop.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[tstl-this-void-self-drop]"
const AMBIENT_TYPES_REL = "temper/addons/types"
const SUCCESS_MESSAGE = "No colon-called member declares a sole `this: void`."

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function messageOf(v: TstlThisVoidSelfDropFinding): string {
  switch (v.kind) {
    case "constructor":
      return `constructor member \`${v.name}\` declares a sole \`this: void\` — TSTL emits a dot-call that drops self; use \`this: <Class>\` (or a method signature) instead`
    case "control-method":
      return `control method \`${v.name}\` on a \`& Control\` type declares a sole \`this: void\` — TSTL emits a dot-call that drops self and shifts arguments; declare \`this: <Control>\` (property-arrow, source-safe) instead`
    case "xml-handler":
      return `XML-colon-called handler \`${v.name}\` is defined as a sole \`this: void\` value-assignment — TSTL emits a dot-call that drops self and shifts arguments; declare \`this: <Receiver>\` (matching the XML colon-call) at the def and its interface member instead`
    default:
      return assertNever(v.kind)
  }
}

function formatViolation(v: TstlThisVoidSelfDropFinding): string {
  return `${v.file}:${v.line}:${v.column} ${messageOf(v)}`
}

function collectFilesByExt(absDir: string, repoRoot: string, ext: string): readonly string[] {
  const out: string[] = []
  for (const entry of readdirSync(absDir, { withFileTypes: true })) {
    const abs = join(absDir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === "dist") continue
      out.push(...collectFilesByExt(abs, repoRoot, ext))
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      out.push(abs.slice(repoRoot.length + 1))
    }
  }
  return out
}

function xmlColonCallsFor(xmlRels: readonly string[], repoRoot: string): ReadonlySet<string> {
  const set = new Set<string>()
  for (const rel of xmlRels) {
    for (const key of collectXmlColonCalls(readFileSync(join(repoRoot, rel), "utf8"))) set.add(key)
  }
  return set
}

function scanFile(
  rel: string,
  repoRoot: string,
  xmlColonCalls: ReadonlySet<string> | undefined,
  controlFamily: ReadonlySet<string>
): readonly TstlThisVoidSelfDropFinding[] {
  const source = readFileSync(join(repoRoot, rel), "utf8")
  const sf = ts.createSourceFile(rel, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  return scanTstlThisVoidSelfDrop(sf, { xmlColonCalls, controlFamily })
}

interface ScanTarget {
  readonly rel: string
  readonly xmlColonCalls: ReadonlySet<string> | undefined
}

function collectScanTargets(repoRoot: string): readonly ScanTarget[] {
  const targets: ScanTarget[] = []

  const addons = [...listAllAddons({ repoRoot })].sort((a, b) =>
    a.repoRelDir.localeCompare(b.repoRelDir)
  )
  if (addons.length === 0) {
    throw new Error(
      "addon roster is empty — listAllAddons() found no addon.json across the domain tree; the scan would pass vacuously. Check that addon dirs are declared workspace members carrying an addon.json (listExternalAddonRelDirs)."
    )
  }
  for (const addon of addons) {
    const xmlColonCalls = xmlColonCallsFor(collectFilesByExt(addon.dir, repoRoot, ".xml"), repoRoot)
    for (const rel of [...collectFilesByExt(addon.dir, repoRoot, ".ts")].sort()) {
      targets.push({ rel, xmlColonCalls })
    }
  }

  const typesAbs = join(repoRoot, AMBIENT_TYPES_REL)
  if (!existsSync(typesAbs)) {
    throw new Error(
      `ambient type tree not found at ${AMBIENT_TYPES_REL} — the resolve path is stale (it moved); constructor/control-method coverage would silently vanish. Repoint AMBIENT_TYPES_REL.`
    )
  }
  for (const rel of [...collectFilesByExt(typesAbs, repoRoot, ".ts")].sort()) {
    targets.push({ rel, xmlColonCalls: undefined })
  }

  return targets
}

function deriveControlFamily(
  targets: readonly ScanTarget[],
  repoRoot: string
): ReadonlySet<string> {
  const edges = new Map<string, Set<string>>()
  for (const target of targets) {
    const source = readFileSync(join(repoRoot, target.rel), "utf8")
    const sf = ts.createSourceFile(
      target.rel,
      source,
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS
    )
    for (const [name, reaches] of collectTypeFamilyEdges(sf)) {
      const into = edges.get(name) ?? new Set<string>()
      for (const reached of reaches) into.add(reached)
      edges.set(name, into)
    }
  }
  return resolveControlFamily(edges)
}

function collectFindings(repoRoot: string): {
  readonly population: Population
  readonly findings: readonly TstlThisVoidSelfDropFinding[]
} {
  const targets = collectScanTargets(repoRoot)
  const controlFamily = deriveControlFamily(targets, repoRoot)
  const { population, violations } = examinePopulation<ScanTarget, TstlThisVoidSelfDropFinding>({
    members: targets,
    unit: "addon TypeScript files",
    labelOf: (target) => target.rel,
    siteOf: (target) => join(repoRoot, target.rel),
    examine: (target) => scanFile(target.rel, repoRoot, target.xmlColonCalls, controlFamily),
    membership: {
      kind: "enumerated",
      because:
        "`collectScanTargets` walks with a bare `readdirSync`, which raises on a directory " +
        "that is not there, and it throws outright on an empty addon roster or a moved " +
        "ambient type tree, while `resolveControlFamily` throws on a corpus declaring no " +
        "`Control` — the three ways the enumeration could shrink quietly",
    },
  })
  return { population, findings: violations }
}

function main(): undefined {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), { ...STANDARD_FLAGS }, { passthrough: true })
    flags = { json: parsed.flags.json, repoRoot: parsed.flags.repoRoot }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()

  let scan: ReturnType<typeof collectFindings>
  try {
    scan = collectFindings(repoRoot)
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }
  const findings = scan.findings

  exitOnResult({
    violations: findings,
    options: {
      population: scan.population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `sole \`this: void\` colon-called members — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: SUCCESS_MESSAGE,
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main()
}
