import { resolve } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"
import ts from "typescript"
import type { AuditReading } from "../audit-reading/audit-reading.module.code.ts"
import { examineFilePopulation, populationCoverage } from "../population/population.module.code.ts"
import {
  emptyRules,
  type RuleReading,
  ruleReading,
  summarizeRuleCorpus,
} from "../rule-population/rule-population.module.code.ts"
import { SYNTAX_SCANNER_ENTRIES } from "../scanner-registry/scanner-registry.module.code.ts"
import {
  closeScannerTallies,
  newScannerTallies,
  offerFileToEntries,
  type SyntaxScannerEntry,
  scriptKindFor,
} from "../syntax-scanner-entry/syntax-scanner-entry.module.code.ts"
import { listTsFiles } from "../ts-file-iteration/ts-file-iteration.module.code.ts"

const CANARY_PREFIX = "canary:"
export const SKIPS_EVERYTHING = `${CANARY_PREFIX}skips-every-file`
export const WEIGHS_EVERYTHING = `${CANARY_PREFIX}weighs-every-file`

const SCANNER_REGISTRY =
  "akasha/checks/cluster-checks/modules/scanner-registry/scanner-registry.module.code.ts"

const CANARY_ENTRIES: readonly SyntaxScannerEntry[] = [
  {
    name: SKIPS_EVERYTHING,
    preFileSkip: () => true,
    findFindings: () => [],
    successMessage: "control — must weigh nothing",
  },
  {
    name: WEIGHS_EVERYTHING,
    findFindings: () => [],
    successMessage: "control — must weigh every file offered",
  },
]

interface RulePopulationAudit {
  readonly rules: readonly RuleReading[]
  readonly reading: AuditReading
  readonly empty: readonly RuleReading[]
  readonly filesExamined: number
  readonly filesDeclared: number
}

export async function gatherRulePopulations(args: {
  readonly repoRoot: string
  readonly treeSha: string | undefined
  readonly cacheDir: string | undefined
}): Promise<RulePopulationAudit> {
  const files = await listTsFiles(args)
  const entries = [...SYNTAX_SCANNER_ENTRIES, ...CANARY_ENTRIES]
  const tallies = newScannerTallies(entries.length)

  const { population } = examineFilePopulation<never>({
    files: [...files],
    unit: "TS files",
    membership: {
      kind: "enumerated",
      because:
        "`files` is the file graph's own TS enumeration, whole before this walk starts — the " +
        "graph is built in process or parsed back and rejected entire on any malformation — and " +
        "the per-file read below raises into the constructor's own failed-read channel rather " +
        "than being stepped past, so acquisition cannot come back short without saying so",
    },
    pathOf: (rel) => resolve(args.repoRoot, rel),
    scan: (rel, source) => {
      offerFileToEntries({
        entries,
        tallies,
        rel,
        repoRoot: args.repoRoot,
        sourceFile: ts.createSourceFile(
          rel,
          source,
          ts.ScriptTarget.Latest,
          true,
          scriptKindFor(rel)
        ),
      })
      return []
    },
  })

  const buckets = closeScannerTallies({ entries, tallies })
  const coverage = populationCoverage(population)
  assertCanaries({ buckets, examined: coverage.observed })

  const rules = buckets
    .filter((b) => !b.name.startsWith(CANARY_PREFIX))
    .map((bucket) =>
      ruleReading({
        rule: bucket.name,
        kind: "syntax-scanner",
        source: SCANNER_REGISTRY,
        scanned: bucket.offered,
        compared: bucket.weighed,
        findings: bucket.findings.length,
      })
    )

  return {
    rules,
    reading: summarizeRuleCorpus(rules),
    empty: emptyRules(rules),
    filesExamined: coverage.observed,
    filesDeclared: coverage.declared,
  }
}

export function assertCanaries(args: {
  readonly buckets: readonly {
    readonly name: string
    readonly offered: number
    readonly weighed: number
  }[]
  readonly examined: number
}): undefined {
  const skipping = args.buckets.find((b) => b.name === SKIPS_EVERYTHING)
  const weighing = args.buckets.find((b) => b.name === WEIGHS_EVERYTHING)
  if (skipping === undefined || weighing === undefined) {
    throw new OperationalError(
      `rule-population controls did not run: ${SKIPS_EVERYTHING} and ${WEIGHS_EVERYTHING} must both be dispatched, so nothing this run counted can be believed`
    )
  }
  if (skipping.weighed !== 0) {
    throw new OperationalError(
      `rule-population control ${SKIPS_EVERYTHING} skips every file and yet weighed ${skipping.weighed} — the per-rule population is not counting the skip, so no empty rule this run reports would be found`
    )
  }
  if (skipping.offered !== args.examined) {
    throw new OperationalError(
      `rule-population control ${SKIPS_EVERYTHING} was offered ${skipping.offered} of ${args.examined} examined files — the dispatch is not reaching every rule, so a rule's population is not the corpus`
    )
  }
  if (weighing.weighed !== args.examined) {
    throw new OperationalError(
      `rule-population control ${WEIGHS_EVERYTHING} skips nothing and yet weighed ${weighing.weighed} of ${args.examined} examined files — the per-rule population is under-counting, so a live rule could report as empty`
    )
  }
}

export const BLIND_SPOTS: readonly string[] = [
  "ast-grep rules — `check-ast-grep` already refuses a rule whose population came back empty, so they are enforced rather than read here",
  "rules inside a check step — a check is a process with no registry to walk, so its internal rules are reported only by the check itself",
  "`.d.ts`, `*.generated.ts` and the check-exempt directories — outside the canonical TS population by construction, so no rule is read over them",
]
