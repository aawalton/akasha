#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { type FlagSpec, parseArgs, STANDARD_FLAGS } from "../lib/cli-args.ts"
import {
  type CodegenIdentityEndpoint,
  type CodegenIdentityPair,
  type CodegenIdentityRemedy,
  type CodegenRepo,
  findCodegenTypeIdentityDrift,
  remedyFileFor,
} from "../lib/codegen-type-identity-drift.ts"
import {
  CODEGEN_IDENTITY_BLIND_SPOTS,
  CODEGEN_TYPE_IDENTITY_PAIRS,
  INSTRUCTIONS_MIRROR_DIR,
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

const OWN_REPO_FROM_HERE = "../../../../.."

const CHECK_FLAGS = {
  ...STANDARD_FLAGS,
  instructionsRoot: { kind: "string" },
} as const satisfies Record<string, FlagSpec>

type Roots = Readonly<Record<CodegenRepo, string>>

function instructionsRootFrom(named: string | undefined): string {
  const stated = named ?? process.env.AKASHA_ROOT
  const root =
    stated === undefined || stated === ""
      ? resolve(import.meta.dir, OWN_REPO_FROM_HERE)
      : resolve(stated)
  if (!existsSync(resolve(root, INSTRUCTIONS_MIRROR_DIR))) {
    throw new Error(
      `instructionsRootFrom: ${root} holds no ${INSTRUCTIONS_MIRROR_DIR}, so it is not a ` +
        "checkout of the instructions repo. Every mirror generator this check reads stands " +
        "there: pass --instructions-root, or set AKASHA_ROOT."
    )
  }
  return root
}

function readEndpoint(args: {
  readonly roots: Roots
  readonly pair: CodegenIdentityPair
  readonly role: "canonical" | "mirror"
  readonly endpoint: CodegenIdentityEndpoint
}): string {
  const { repo, file } = args.endpoint
  try {
    return readFileSync(join(args.roots[repo], file), "utf8")
  } catch (err) {
    throw new Error(
      `${args.role} "${file}" could not be read from the ${repo} checkout at ${args.roots[repo]} ` +
        `(${err instanceof Error ? err.message : String(err)}). Repoint the "${args.pair.name}" ` +
        `pair's ${args.role} in ${REGISTRY} at the file's new home and repo, or drop the pair ` +
        "if that declaration is gone."
    )
  }
}

function remedyFile(roots: Roots, pair: CodegenIdentityPair): CodegenIdentityRemedy {
  const remedy = remedyFileFor(pair.mirror, MIRROR_GENERATORS)
  if (remedy.file !== pair.mirror.file && !existsSync(join(roots[remedy.repo], remedy.file)))
    throw new Error(
      `the generator registered for mirror "${pair.mirror.file}" is not at "${remedy.file}" in ` +
        `the ${remedy.repo} checkout at ${roots[remedy.repo]}. Repoint MIRROR_GENERATORS in ` +
        `${REGISTRY} at the generator's new home.`
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

function reportBlindSpots(): undefined {
  process.stdout.write(
    `${PREFIX} ${CODEGEN_TYPE_IDENTITY_PAIRS.length} pair(s) checked. ` +
      `DECLARED BLIND SPOTS (${CODEGEN_IDENTITY_BLIND_SPOTS.length}) — shapes this check ` +
      "structurally cannot see, so its verdict is silent about them:\n"
  )
  for (const spot of CODEGEN_IDENTITY_BLIND_SPOTS) {
    process.stdout.write(`${PREFIX}   - ${spot.shape}\n`)
    process.stdout.write(`${PREFIX}     ${spot.reason}\n`)
  }
}

function main(): undefined {
  let flags: { json: boolean; repoRoot: string | undefined; instructionsRoot: string | undefined }
  try {
    const parsed = parseArgs(process.argv.slice(2), { ...CHECK_FLAGS })
    flags = {
      json: parsed.flags.json,
      repoRoot: parsed.flags.repoRoot,
      instructionsRoot: parsed.flags.instructionsRoot,
    }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  if (!flags.json) reportBlindSpots()

  let examination: {
    readonly population: Population
    readonly violations: readonly { readonly file: string; readonly message: string }[]
  }
  try {
    const roots: Roots = {
      code: flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot(),
      instructions: instructionsRootFrom(flags.instructionsRoot),
    }
    examination = examinePopulation({
      members: CODEGEN_TYPE_IDENTITY_PAIRS,
      unit: "type-identity pairs",
      membership: {
        kind: "enumerated",
        because:
          "the members are the rows of `CODEGEN_TYPE_IDENTITY_PAIRS`, a registry spelled in this repo's source, so nothing acquires them and the array cannot arrive short of itself",
      },
      labelOf: (pair) => pair.name,
      siteOf: (pair) => join(roots[pair.mirror.repo], pair.mirror.file),
      examine: (pair) =>
        reportDrift({
          pair,
          remedy: remedyFile(roots, pair),
          canonicalText: readEndpoint({
            roots,
            pair,
            role: "canonical",
            endpoint: pair.canonical,
          }),
          mirrorText: readEndpoint({ roots, pair, role: "mirror", endpoint: pair.mirror }),
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
