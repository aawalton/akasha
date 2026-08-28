#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import {
  type CodegenIdentityEndpoint,
  type CodegenIdentityPair,
  type CodegenIdentityRemedy,
  findCodegenTypeIdentityDrift,
  remedyFileFor,
} from "../lib/codegen-type-identity-drift.ts"
import {
  CODEGEN_IDENTITY_BLIND_SPOTS,
  CODEGEN_TYPE_IDENTITY_PAIRS,
  MIRROR_GENERATOR_DIR,
  MIRROR_GENERATORS,
} from "../lib/codegen-type-identity-pairs.ts"
import { examinePopulation, type Population } from "../../../../tools/lib/check-workflow/population"
import { remediationHint } from "../../../../tools/lib/check-workflow/remediation-doc"
import { getRepoRoot } from "../lib/repo-root.ts"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const PREFIX = "[codegen-type-identity-drift]"
const SUCCESS_MESSAGE =
  "Every registered mirror matches its canonical source — within the shapes this check can address (see the declared blind spots above)."
const REMEDIATION_DOC = remediationHint(
  "Fix the flagged generator's hardcoded set to match the canonical, then regenerate: ops temper addon-data generate"
)

const REGISTRY = "infra/cluster-checks/src/lib/codegen-type-identity-pairs.ts"

/**
 * The one checkout every canonical and every mirror is read from.
 *
 * Resolved BEFORE the check prints anything, because what it prints is a count of pairs weighed:
 * a root that does not resolve must leave no count behind it.
 */
function rootFrom(named: string | undefined): string {
  const root = named === undefined || named === "" ? getRepoRoot() : resolve(named)
  if (!existsSync(resolve(root, MIRROR_GENERATOR_DIR))) {
    throw new Error(
      `rootFrom: ${root} holds no ${MIRROR_GENERATOR_DIR}, so it is not a checkout of akasha. ` +
        "Every canonical and every mirror this check reads stands there: pass --repo-root, or " +
        "set WORKSPACE."
    )
  }
  return root
}

function readEndpoint(args: {
  readonly root: string
  readonly pair: CodegenIdentityPair
  readonly role: "canonical" | "mirror"
  readonly endpoint: CodegenIdentityEndpoint
}): string {
  const { file } = args.endpoint
  try {
    return readFileSync(join(args.root, file), "utf8")
  } catch (err) {
    throw new Error(
      `${args.role} "${file}" could not be read from the checkout at ${args.root} ` +
        `(${err instanceof Error ? err.message : String(err)}). Repoint the "${args.pair.name}" ` +
        `pair's ${args.role} in ${REGISTRY} at the file's new home, or drop the pair ` +
        "if that declaration is gone."
    )
  }
}

function remedyFile(root: string, pair: CodegenIdentityPair): CodegenIdentityRemedy {
  const remedy = remedyFileFor(pair.mirror, MIRROR_GENERATORS)
  if (remedy.file !== pair.mirror.file && !existsSync(join(root, remedy.file)))
    throw new Error(
      `the generator registered for mirror "${pair.mirror.file}" is not at "${remedy.file}" in ` +
        `the checkout at ${root}. Repoint MIRROR_GENERATORS in ${REGISTRY} at the generator's ` +
        "new home."
    )
  return remedy
}

function describe(delta: readonly string[]): string {
  return delta.length > 0 ? delta.join(", ") : "(none)"
}

function reportDrift(args: {
  readonly pair: CodegenIdentityPair
  readonly canonicalText: string
  readonly mirrorText: string
  readonly remedy: CodegenIdentityRemedy
}): readonly { readonly file: string; readonly message: string }[] {
  const emitted = args.remedy.file !== args.pair.mirror.file
  return findCodegenTypeIdentityDrift([
    { pair: args.pair, canonicalText: args.canonicalText, mirrorText: args.mirrorText },
  ]).map((d) => ({
    file: args.remedy.file,
    message:
      `${d.name}: "${d.mirrorSymbol}" in ${d.mirrorFile} drifted from canonical ` +
      `"${d.canonicalSymbol}" in ${d.canonicalFile} — missing from mirror: [${describe(
        d.missingFromMirror
      )}]; extra in mirror: [${describe(d.extraInMirror)}]` +
      (emitted
        ? `. ${d.mirrorFile} is emitted and must not be edited: fix the set in ${args.remedy.file}, then run \`ops temper addon-data generate\`.`
        : ""),
  }))
}

/**
 * The blind spots, and no count of pairs.
 *
 * A count printed here would be a count of what the registry holds rather than of what was
 * weighed, and the two part the moment anything downstream throws. The pairs actually weighed are
 * reported once, by the population line `exitOnResult` prints.
 */
function reportBlindSpots(): undefined {
  process.stdout.write(
    `${PREFIX} DECLARED BLIND SPOTS (${CODEGEN_IDENTITY_BLIND_SPOTS.length}) — shapes this check ` +
      "structurally cannot see, so its verdict is silent about them:\n"
  )
  for (const spot of CODEGEN_IDENTITY_BLIND_SPOTS) {
    process.stdout.write(`${PREFIX}   - ${spot.shape}\n`)
    process.stdout.write(`${PREFIX}     ${spot.reason}\n`)
  }
}

function main(): undefined {
  let flags: { json: boolean; repoRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), STANDARD_FLAGS)
    flags = {
      json: parsed.flags.json,
      repoRoot: parsed.flags.repoRoot,
    }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  let examination: {
    readonly population: Population
    readonly violations: readonly { readonly file: string; readonly message: string }[]
  }
  try {
    const root = rootFrom(flags.repoRoot)
    if (!flags.json) reportBlindSpots()
    examination = examinePopulation({
      members: CODEGEN_TYPE_IDENTITY_PAIRS,
      unit: "type-identity pairs",
      membership: {
        kind: "enumerated",
        because:
          "the members are the rows of `CODEGEN_TYPE_IDENTITY_PAIRS`, a registry spelled in this repo's source, so nothing acquires them and the array cannot arrive short of itself",
      },
      labelOf: (pair) => pair.name,
      siteOf: (pair) => join(root, pair.mirror.file),
      examine: (pair) =>
        reportDrift({
          pair,
          remedy: remedyFile(root, pair),
          canonicalText: readEndpoint({
            root,
            pair,
            role: "canonical",
            endpoint: pair.canonical,
          }),
          mirrorText: readEndpoint({ root, pair, role: "mirror", endpoint: pair.mirror }),
        }),
    })
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  exitOnResult({
    violations: examination.violations,
    options: {
      population: examination.population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `${examination.violations.length} codegen string set(s) drifted from their canonical source`,
      successMessage: SUCCESS_MESSAGE,
      remediationDoc: REMEDIATION_DOC,
    },
  })
}

if (import.meta.main) {
  main()
}
