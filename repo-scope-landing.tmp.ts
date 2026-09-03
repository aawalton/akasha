import { readFileSync } from "node:fs"
import { landedMechanically } from "@akasha/command-system/asking"

const ROOT = "/var/home/walton/repos/akasha"

const TARGET = "akasha/checks/cluster-checks/modules/repo-scope/repo-scope.module.code.ts"

// The adapted module. `Repo` was `export type Repo = string` in the markdown document module, a
// system this migration removes, and no reader of this file ever imported the type — only the
// values. So the alias goes and the constants stand on their own, which is what lets this sit
// inside `@akasha/checks` without that package taking a dependency on the pages system.
const BODY = `// Which repository a check speaks about, and which folders a check does not walk.
//
// This stood at \`repo/scope/scope.ts\`, where ten files inside akasha reached out to it by a
// relative path and four in \`tools/\` reached in the same way. It is three constants; the reach
// was the only thing wrong with it.
//
// It carries no import. The \`Repo\` alias it used to type these with was \`string\` in the
// markdown document module, and no reader of this file has ever imported the type — every one of
// the fourteen takes \`CHECK_EXEMPT_DIRS\` or \`CODE_REPO\` and nothing else. Dropping the alias
// is what lets this stand inside \`@akasha/checks\`, whose manifest names no pages system.
//
// \`INSTRUCTIONS_REPO\` came with the other two and went here with nothing reading it, so it is
// not carried on. The name survives in \`bare-repo-init\` as a shell variable, which is a
// different thing wearing the same spelling.

export const CHECK_EXEMPT_DIRS: ReadonlySet<string> = new Set(["__fixtures__", "generated"])

export const CODE_REPO = "code"
`

// path -> the specifier that path must now spell
const IMPORTERS: Record<string, string> = {
  "akasha/checks/cluster-checks/pages/guarded-resolve/guarded-resolve.cluster-check.code.ts":
    "../../modules/repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/pages/k8s-node-selector/k8s-node-selector.cluster-check.code.ts":
    "../../modules/repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/pages/memory-qos/memory-qos.cluster-check.code.ts":
    "../../modules/repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/pages/mock-module-leak/mock-module-leak.cluster-check.code.ts":
    "../../modules/repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/pages/no-hardcoded-surface/no-hardcoded-surface.cluster-check.code.ts":
    "../../modules/repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/modules/check-boundary-parse/check-boundary-parse.module.code.ts":
    "../repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/modules/check-phantom-deps-graph/check-phantom-deps-graph.module.code.ts":
    "../repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/modules/check-timezone-handling/check-timezone-handling.module.code.ts":
    "../repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/modules/repo-files/repo-files.module.code.ts":
    "../repo-scope/repo-scope.module.code.ts",
  "akasha/checks/cluster-checks/modules/tree-reading/tree-reading.module.code.ts":
    "../repo-scope/repo-scope.module.code.ts",
  "./akasha/checks/cluster-checks/modules/file-finding/file-finding.module.code.ts":
    "../../../akasha/checks/cluster-checks/modules/repo-scope/repo-scope.module.code.ts",
  "tools/lib/ci-test-fanout/compute-reverse-reachability.ts":
    "../../../akasha/checks/cluster-checks/modules/repo-scope/repo-scope.module.code.ts",
  "tools/lib/graph/producers/lib/node-id.ts":
    "../../../../../akasha/checks/cluster-checks/modules/repo-scope/repo-scope.module.code.ts",
  "tools/lib/repo-files-at.ts":
    "../../akasha/checks/cluster-checks/modules/repo-scope/repo-scope.module.code.ts",
}

const OLD = /"(?:\.\.\/)+repo\/scope\/scope\.ts"/g

const changes: { path: string; body: Uint8Array | null }[] = []

changes.push({ path: TARGET, body: new TextEncoder().encode(BODY) })

for (const [path, specifier] of Object.entries(IMPORTERS)) {
  const before = readFileSync(`${ROOT}/${path}`, "utf8")
  const hits = before.match(OLD)
  if (hits === null || hits.length !== 1) {
    console.error(`REFUSED: ${path} spells the old path ${hits === null ? 0 : hits.length} times`)
    process.exit(1)
  }
  const after = before.replace(OLD, `"${specifier}"`)
  if (after === before) {
    console.error(`REFUSED: ${path} was unchanged`)
    process.exit(1)
  }
  changes.push({ path, body: new TextEncoder().encode(after) })
}

changes.push({ path: "repo/scope/scope.ts", body: null })

console.error(`landing ${changes.length} edits`)

const answer = landedMechanically(
  ROOT,
  "repo-scope-migration",
  changes,
  "repo/scope/scope.ts becomes a cluster-checks module, and its fourteen readers stop reaching outside akasha for three constants"
)

console.error(JSON.stringify(answer, null, 2))
