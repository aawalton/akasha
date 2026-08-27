import { existsSync, realpathSync } from "node:fs"
import { isAbsolute, relative, resolve, sep } from "node:path"
import { examinePopulation, type MembershipBound, type Population } from "../../../../../instructions/tools/lib/check-workflow/population"

export interface CodeReach {
  readonly ref: string
  readonly kind: "path" | "specifier"
  readonly sites: readonly string[]
}

const SITES_SHOWN = 5

const OUTSIDE_OWN_SOURCE = "node_modules"

export interface ReachRoot {
  readonly ref: string
  readonly filePath: string
}

export type ReachOutcome =
  | { readonly kind: "root"; readonly filePath: string }
  | { readonly kind: "outside"; readonly resolvedPath: string }

function namedAt(reach: CodeReach): string {
  const shown = reach.sites.slice(0, SITES_SHOWN).join(", ")
  const rest = reach.sites.length - Math.min(reach.sites.length, SITES_SHOWN)
  return rest === 0 ? shown : `${shown} and ${String(rest)} more`
}

function resolveRef(reach: CodeReach, repoRoot: string): string | null {
  if (reach.kind === "path") {
    const absolute = resolve(repoRoot, reach.ref)
    return existsSync(absolute) ? absolute : null
  }
  try {
    return Bun.resolveSync(reach.ref, repoRoot)
  } catch {
    return null
  }
}

function realPath(path: string): string | null {
  try {
    return realpathSync(path)
  } catch {
    return null
  }
}

export function resolveReach(args: {
  readonly reach: CodeReach
  readonly repoRoot: string
  readonly moduleByRelPath: ReadonlyMap<string, string>
}): ReachOutcome {
  const { reach, repoRoot, moduleByRelPath } = args
  const resolved = resolveRef(reach, repoRoot)
  const real = resolved === null ? null : realPath(resolved)
  const realRoot = realPath(repoRoot) ?? repoRoot
  if (real === null) {
    throw new Error(
      `\`${reach.ref}\` resolves to nothing under ${repoRoot}, read as ` +
        `${reach.kind === "path" ? "a repo-relative file path" : "a package specifier through that package's own `exports` map"}` +
        `, and it is named at ${namedAt(reach)} in the instructions repository — so this run cannot ` +
        "tell an export nothing reaches from one whose reach it failed to follow, and reports neither"
    )
  }
  const rel = relative(realRoot, real)
  if (
    rel === "" ||
    rel.startsWith("..") ||
    isAbsolute(rel) ||
    rel.split(sep).includes(OUTSIDE_OWN_SOURCE)
  ) {
    return { kind: "outside", resolvedPath: real }
  }
  const filePath = moduleByRelPath.get(rel)
  if (filePath === undefined) {
    throw new Error(
      `\`${reach.ref}\` resolves to ${rel}, which the module graph this run built holds no module ` +
        `for, and it is named at ${namedAt(reach)} in the instructions repository — so nothing that ` +
        "file reaches was credited and the verdict below covers less than it claims"
    )
  }
  return { kind: "root", filePath }
}

export interface AnalysisInputs {
  readonly population: Population
  readonly roots: readonly ReachRoot[]
  readonly outside: number
}

type AnalysisInput =
  | { readonly kind: "workspace"; readonly root: string }
  | { readonly kind: "reach"; readonly reach: CodeReach }

const WORKSPACES_ONLY = "workspaces"

const WORKSPACES_AND_REACHES = "analysis inputs (workspaces and instructions-repo reaches)"

const WORKSPACE_MEMBERS =
  "the workspaces are the list discovery returned, read from the root `package.json` through `listWorkspaceDirs` or from the `--config` manifest, and both throw when that file is missing or unparseable rather than returning a short list"

const REACH_MEMBERS =
  ", and the reaches are one `instructions reaches --json` answer parsed whole, where a non-zero exit, an answer in a shape this does not recognise, or a tree that read no file at all refuses the run rather than shortening the list"

function membershipFor(withReaches: boolean): MembershipBound {
  return {
    kind: "enumerated",
    because: withReaches ? `${WORKSPACE_MEMBERS}${REACH_MEMBERS}` : WORKSPACE_MEMBERS,
  }
}

export function analysisInputs(args: {
  readonly workspaces: readonly { readonly root: string }[]
  readonly workspaceRootsInGraph: ReadonlySet<string>
  readonly reaches: readonly CodeReach[] | null
  readonly siteOf: ((reach: CodeReach) => string | null) | null
  readonly repoRoot: string
  readonly moduleByRelPath: ReadonlyMap<string, string>
}): AnalysisInputs {
  const { workspaces, workspaceRootsInGraph, reaches, siteOf, repoRoot } = args
  const members: AnalysisInput[] = [
    ...workspaces.map((workspace): AnalysisInput => ({ kind: "workspace", root: workspace.root })),
    ...(reaches ?? []).map((reach): AnalysisInput => ({ kind: "reach", reach })),
  ]
  const roots: ReachRoot[] = []
  let outside = 0

  const { population } = examinePopulation({
    members,
    unit: reaches === null ? WORKSPACES_ONLY : WORKSPACES_AND_REACHES,
    membership: membershipFor(reaches !== null),
    labelOf: (member) =>
      member.kind === "workspace"
        ? member.root === ""
          ? "<repo root>"
          : member.root
        : `reach ${member.reach.ref}`,
    siteOf: (member) =>
      member.kind === "workspace"
        ? resolve(repoRoot, member.root, "package.json")
        : siteOf === null
          ? null
          : siteOf(member.reach),
    examine: (member) => {
      if (member.kind === "workspace") {
        if (!workspaceRootsInGraph.has(member.root)) {
          throw new Error(
            "the graph this run built holds no file attributed to this workspace, so nothing here was analysed"
          )
        }
        return []
      }
      const outcome = resolveReach({
        reach: member.reach,
        repoRoot,
        moduleByRelPath: args.moduleByRelPath,
      })
      if (outcome.kind === "outside") {
        outside++
        return []
      }
      roots.push({ ref: member.reach.ref, filePath: outcome.filePath })
      return []
    },
  })

  return { population, roots, outside }
}
