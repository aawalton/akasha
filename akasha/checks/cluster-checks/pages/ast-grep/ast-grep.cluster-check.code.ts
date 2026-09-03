import { spawnSync } from "node:child_process"
import { relative, resolve } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { z } from "zod"
import { parseArgs, STANDARD_FLAGS } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import { getRepoRoot } from "../../../../../infra/cluster-checks/src/lib/repo-root.ts"
import {
  type AstGrepFinding,
  type AstGrepViolation,
  decideRuleOutcome,
  deriveRulePopulations,
  duplicateRuleIds,
  parseWalkedEntities,
  reconcilePopulations,
  stripInspectTrace,
} from "../../../../../tools/lib/check-workflow/ast-grep-rules"
import {
  discoverSgconfigs,
  readAstGrepRules,
} from "../../../../../tools/lib/check-workflow/check-configs-ast-grep"
import { examineFilePopulation } from "../../../../../tools/lib/check-workflow/population"
import { exitOnResult } from "../../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[ast-grep]"

const UNIT = "rule applications"

const findingSchema = z.looseObject({
  ruleId: z.string(),
  file: z.string(),
  message: z.string(),
  range: z.looseObject({ start: z.looseObject({ line: z.number() }) }),
})

function parseFindings(stdout: string): readonly AstGrepFinding[] {
  const trimmed = stdout.trim()
  if (trimmed === "") return []
  return z
    .array(findingSchema)
    .parse(JSON.parse(trimmed))
    .map((f) => ({ ruleId: f.ruleId, file: f.file, line: f.range.start.line, message: f.message }))
}

function applicationLabel(rulePath: string, path: string): string {
  return `${rulePath} @ ${path}`
}

function main(): never {
  const { flags } = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
  const repoRoot = flags.repoRoot ?? getRepoRoot()
  const rulesRoot = ownRepoRoot()

  const sgconfigs = discoverSgconfigs(rulesRoot)
  if (sgconfigs.length === 0) {
    process.stderr.write(
      `${PREFIX} found no sgconfig.yml under ${rulesRoot} — refusing to report the ast-grep route clean ` +
        `having scanned nothing. The rules stand in the instructions repo; the tree they scan is the code checkout.\n`
    )
    process.exit(2)
  }

  const { rules, gaps } = readAstGrepRules(rulesRoot)
  const violations: AstGrepViolation[] = []
  for (const sgconfig of sgconfigs) {
    const dir = sgconfig.slice(0, sgconfig.lastIndexOf("/"))
    if (!rules.some((r) => r.rule.path.startsWith(`${dir}/`))) {
      violations.push({
        file: sgconfig,
        message: `declares no rule files — an ast-grep config with no rules verifies nothing`,
      })
    }
  }

  const args = [
    "scan",
    "--inline-rules",
    rules.map((r) => r.source.trim()).join("\n---\n"),
    "--json",
    "--inspect",
    "entity",
  ]
  const run =
    rules.length === 0
      ? undefined
      : spawnSync("ast-grep", args, {
          cwd: repoRoot,
          encoding: "utf-8",
          maxBuffer: 64 * 1024 * 1024,
        })
  if (run?.error !== undefined) {
    process.stderr.write(`${PREFIX} could not run ast-grep: ${run.error.message}\n`)
    process.exit(2)
  }
  if (run !== undefined && (run.status ?? 2) >= 2) {
    process.stderr.write(
      `${PREFIX} ast-grep exited ${run.status ?? 2}: ${stripInspectTrace(run.stderr)}\n`
    )
    process.exit(2)
  }

  const entities = parseWalkedEntities(run?.stderr ?? "")
  const findings = parseFindings(run?.stdout ?? "")
  const populations = deriveRulePopulations(
    rules.map((r) => r.rule),
    entities
  )

  for (const [id, paths] of duplicateRuleIds(rules.map((r) => r.rule))) {
    for (const path of paths) {
      violations.push({
        file: path,
        message:
          `declares the id \`${id}\`, which ${paths.length} rule files declare (${paths.join(", ")}) — ` +
          `ast-grep attributes a finding to its rule by id, so no finding under this id can be sited. Rename one.`,
      })
    }
  }

  for (const { rule } of rules) {
    const applied = populations.get(rule.path) ?? []
    process.stdout.write(`${PREFIX} ${rule.id}: ${applied.length} file(s)\n`)
    violations.push(
      ...decideRuleOutcome({
        rule,
        populationSize: applied.length,
        findings: findings.filter((f) => f.ruleId === rule.id),
      })
    )
  }
  process.stdout.write(
    `${PREFIX} ran ${rules.length} rule(s) from ${sgconfigs.length} config(s) in 1 walk\n`
  )

  const unexaminable = new Map<string, string>()
  for (const gap of gaps) unexaminable.set(gap.path, gap.reason)
  for (const d of reconcilePopulations(populations, entities)) {
    unexaminable.set(
      d.path,
      `the population derivation places ${d.derived} rule(s) here and ast-grep's walk reported ` +
        `${d.observed} (${d.language}) — no population line resting on this path can be believed`
    )
  }
  const pathOf = new Map<string, string>()
  for (const [rulePath, paths] of populations) {
    for (const path of paths) pathOf.set(applicationLabel(rulePath, path), path)
  }
  const enumerated = new Set(pathOf.values())
  const orphans = [...unexaminable.keys()].filter((path) => !enumerated.has(path))
  const { population } = examineFilePopulation<never>({
    files: [...pathOf.keys(), ...orphans],
    unit: UNIT,
    membership: {
      kind: "enumerated",
      because:
        "the applications are derived above from the rule files and ast-grep's own `--inspect entity` trace, both already in memory here; the run exits 2 on a spawn error or an ast-grep status of 2 or more, and a rule file that would not parse or a path whose trace disagrees with the derivation enters this walk as a member that throws rather than as one that never arrived",
    },
    pathOf: (label) => resolve(repoRoot, pathOf.get(label) ?? label),
    readFile: (site) => {
      const reason = unexaminable.get(relative(repoRoot, site))
      if (reason !== undefined) throw new Error(reason)
      return site
    },
    scan: () => [],
  })

  exitOnResult({ options: { population }, violations })
}

main()
