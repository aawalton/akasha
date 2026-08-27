#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { ALERT_RULES } from "../../../k8s/src/prometheus/synth-alerts.ts"
import { parseArgs } from "../lib/cli-args.ts"
import { errorMessage } from "../../../../tools/lib/check-workflow/error-message"
import { examinePopulation } from "../../../../tools/lib/check-workflow/population"
import {
  FIRE_PATH_PROOF_FIXTURE,
  FIRE_PATH_PROOF_RULES,
  FIRE_PATH_PROOF_WIRING_FIXTURE,
  HISTORICAL_DEFECT_RULES,
  resolvePromtool,
  runInlineRuleUnitTest,
  runRuleUnitTests,
  validateRulesYaml,
  withoutAnnotations,
} from "../lib/promtool-rules.ts"
import { ownRepoRoot } from "../../../../repo/roots/roots"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[prometheus-rules]"

const FIXTURE_DIR = "infra/cluster-checks/__fixtures__/prometheus-rule-tests"
const FIXTURE_GLOB = "*.test.yml"

interface RuleCheckViolation {
  readonly message: string
}

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function discoverFixtures(dirAbs: string): readonly string[] {
  const glob = new Bun.Glob(FIXTURE_GLOB)
  return [...glob.scanSync({ cwd: dirAbs, onlyFiles: true, dot: false })]
    .sort()
    .map((rel) => join(dirAbs, rel))
}

async function proveFireProofRung(promtoolPath: string): Promise<string | null> {
  const wiring = await runInlineRuleUnitTest(
    FIRE_PATH_PROOF_RULES,
    FIRE_PATH_PROOF_WIRING_FIXTURE,
    promtoolPath
  )
  if (!wiring.ok) {
    return (
      `promtool did NOT observe the known-good proof alert firing. The harness is ` +
      `not staging the rules document where promtool resolves it, so every fixture ` +
      `assertion of the form "does not fire" would pass vacuously. promtool output:\n` +
      `${wiring.output}`
    )
  }
  const known = await runInlineRuleUnitTest(
    FIRE_PATH_PROOF_RULES,
    FIRE_PATH_PROOF_FIXTURE,
    promtoolPath
  )
  if (known.ok) {
    return (
      `promtool ACCEPTED a fixture asserting an alert fires while its condition is ` +
      `provably false. The rung is not actually evaluating assertions and would let ` +
      `a dead alert ship. promtool output:\n${known.output}`
    )
  }
  return null
}

async function runFireProofRung(
  rulesYaml: string,
  label: string,
  promtoolPath: string
): Promise<never> {
  const dirAbs = join(ownRepoRoot(), FIXTURE_DIR)
  if (!existsSync(dirAbs)) {
    return toolExit(
      `gate-integrity failure: the fire-proof fixture directory is missing (${FIXTURE_DIR}). ` +
        `This rung proves the shipped alerts actually FIRE; with no fixture directory it ` +
        `cannot, so it fails closed rather than passing vacuously.`
    )
  }
  const fixtures = discoverFixtures(dirAbs)
  if (fixtures.length === 0) {
    return toolExit(
      `gate-integrity failure: ${FIXTURE_DIR} contains no ${FIXTURE_GLOB} fixtures. A ` +
        `fire-proof rung with zero fixtures is a silent no-op — it would report green while ` +
        `proving nothing about whether any alert fires.`
    )
  }

  const proofError = await proveFireProofRung(promtoolPath)
  if (proofError !== null) {
    return toolExit(`gate-integrity failure: ${proofError}\npromtool at: ${promtoolPath}`)
  }
  process.stdout.write(
    `${PREFIX} fire-proof self-proof OK — 'promtool test rules' observes the known-good ` +
      `alert firing and rejects the known-bad fixture.\n`
  )

  const { population } = examinePopulation<string, RuleCheckViolation>({
    members: fixtures,
    unit: "rule-unit-test fixtures",
    membership: {
      kind: "atLeast",
      members: 3,
      from: "the three alert families standing in the composed ALERT_RULES, one fixture each — cert-expiry, whose CertManagerCertRenewalOverdue pair is scraped from the cert-manager controller's own Service; cgroup-psi, whose CgroupPsiCollectorStale reads the node-exporter DaemonSet's textfile collector; and postgres-connections, whose PostgresHighConnections reads pg_stat_activity_count and pg_settings_max_connections, both built into postgres_exporter rather than declared in its custom queries — enumerated by one `Bun.Glob.scanSync` over `dirAbs` in the instructions repo this check stands in, beside the check that reads them, so fewer members means fewer fixture files there, and, the guards above having already exited on a missing directory and on zero, this count buys only the range they cannot see, a silent drop to one or two, to be lowered only alongside deliberately withdrawing an alert family as the domain-expiry, git-mirror probe and electric-shape-storage alerts were",
    },
    labelOf: (path) => path,
    siteOf: (path) => path,
    examine: () => [],
  })

  const result = await runRuleUnitTests(withoutAnnotations(rulesYaml), fixtures, promtoolPath)
  if (!result.ok) {
    process.stdout.write(`${PREFIX} FAILED — rule unit tests failed against ${label}:\n`)
    process.stdout.write(`${result.output}\n`)
    return exitOnResult<RuleCheckViolation>({
      violations: [{ message: result.output }],
      options: {
        population,
        prefix: PREFIX,
        header: `rule unit tests failed against ${label}`,
      },
    })
  }
  process.stdout.write(
    `${PREFIX} OK — ${fixtures.length} rule-unit-test fixture(s) pass against ${label}.\n`
  )
  return exitOnResult<RuleCheckViolation>({
    violations: [],
    options: {
      population,
      prefix: PREFIX,
      successMessage:
        `OK — promtool parse and fire-proof self-proofs hold, ${label} parses, and ` +
        `${fixtures.length} rule-unit-test fixture(s) pass against it.`,
    },
  })
}

async function main(): Promise<never> {
  let flags: { rulesFile: string | undefined }
  try {
    flags = parseArgs(process.argv.slice(2), { rulesFile: { kind: "string" } }).flags
  } catch (err) {
    return toolExit(errorMessage(err))
  }

  const promtool = resolvePromtool()
  if (promtool === null) {
    return toolExit(
      `promtool not found on PATH. This gate validates the synthesized alerts.yml with ` +
        `'promtool check rules' and fire-proofs it with 'promtool test rules'; without ` +
        `promtool it cannot check, so it fails closed (never a silent green). In CI ` +
        `promtool is provisioned into /ci-storage/tools/promtool by ` +
        `preparation-provision-ci-toolchain.`
    )
  }

  const selfProof = await validateRulesYaml(HISTORICAL_DEFECT_RULES, promtool)
  if (selfProof.ok) {
    return toolExit(
      `gate-integrity failure: promtool ACCEPTED the known #15577 defect (a scalar ` +
        `comparison missing the bool modifier). The gate is not actually validating PromQL ` +
        `and would let an unparseable expr ship. promtool at: ${promtool}`
    )
  }
  process.stdout.write(`${PREFIX} parse self-proof OK — promtool rejects the #15577 defect.\n`)

  const rulesYaml =
    flags.rulesFile !== undefined
      ? readFileSync(flags.rulesFile, "utf8")
      : ALERT_RULES
  const label = flags.rulesFile ?? "composed alerts.yml"

  const result = await validateRulesYaml(rulesYaml, promtool)
  if (!result.ok) {
    process.stdout.write(`${PREFIX} FAILED — ${label} does not parse:\n`)
    process.stdout.write(`${result.output}\n`)
    const { population, violations } = examinePopulation<string, RuleCheckViolation>({
      members: [label],
      unit: "rules documents",
      membership: {
        kind: "enumerated",
        because:
          "the one member is the rules document this rung was handed and already read — `--rules-file` read above with `readFileSync`, which raises rather than returning short, or the in-memory `ALERT_RULES` — so the array IS every member there is",
      },
      labelOf: (document) => document,
      siteOf: () => flags.rulesFile ?? null,
      examine: () => [{ message: result.output }],
    })
    return exitOnResult<RuleCheckViolation>({
      violations,
      options: {
        population,
        prefix: PREFIX,
        header: `${label} does not parse`,
      },
    })
  }
  process.stdout.write(`${PREFIX} OK — ${label} parses. ${result.output}\n`)

  return await runFireProofRung(rulesYaml, label, promtool)
}

main().catch((err) => {
  exitOnToolError({ error: new Error(`fatal: ${errorMessage(err)}`), prefix: PREFIX })
})
