#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import {
  CHECKSUM_ANNOTATION_MARKER,
  type ChecksumAnnotationScanFile,
  type ChecksumAnnotationViolation,
  findChecksumAnnotationEmits,
  findSeamSubstitutionSites,
  isChecksumScanPath,
  type SeamSubstitutionCensus,
  scanChecksumAnnotationSubstitution,
} from "../../../../../tools/lib/check-workflow/checksum-annotation-substitution"
import { findFiles } from "../../../../../tools/lib/check-workflow/file-finder"
import {
  examinePopulation,
  type Population,
} from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import {
  type FlagSpec,
  parseArgs,
  STANDARD_FLAGS,
} from "../../modules/cli-args/cli-args.module.code.ts"
import { getRepoRoot } from "../../modules/repo-root/repo-root.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[checksum-annotation-substitution]"

const SCAN_PATTERNS = ["**/*.ts", "**/*.tsx", "**/*.sh", "**/*.bash"] as const

const SEAWEEDFS_DEFECT_FIXTURE: readonly ChecksumAnnotationScanFile[] = [
  {
    path: "akasha/infrastructure/seaweedfs/seaweedfs-deployments/seaweedfs-deployments.module.code.ts",
    content: `export function s3GatewayDeploymentYaml(): string {
  return toYaml({
    spec: {
      template: {
        metadata: { annotations: { "checksum/s3-config": "placeholder" } },
      },
    },
  })
}
`,
  },
  {
    path: "packages/infra/seaweedfs/src/foundation.workflow.ts",
    content: `const applyS3Gateway = step({
  name: "seaweedfs-apply-s3-gateway",
  commands: () => [
    \`kubectl apply --server-side -n seaweedfs -f \${K8S}/s3-gateway.generated.yaml\`,
  ],
})
`,
  },
]

const SEAWEEDFS_FIXTURE_PACKAGE_ROOTS = ["akasha/infrastructure/seaweedfs"] as const

const TEMPLATE_DIR = "pages/workflow-template"

const TEMPLATE_PATTERNS = [`${TEMPLATE_DIR}/**/*.ts`] as const

const OWN_REPO_FROM_HERE = "../../../../.."

const SEAM_RESTS_ON =
  "the workflow templates standing in the instructions checkout named above. The substitution " +
  "half of every pair moved there with the workflows, so a template this check does not read " +
  "makes it LOUDER — a stamped annotation is reported as unstamped — and a substitution site " +
  "anchored to the wrong manifest makes it QUIETER, pairing an emit that nothing stamps. The " +
  "quiet direction is the dangerous one, so the site count is stated on every run"

const CHECK_FLAGS = {
  ...STANDARD_FLAGS,
  instructionsRoot: { kind: "string" },
} as const satisfies Record<string, FlagSpec>

interface SeamCorpus extends SeamSubstitutionCensus {
  readonly templates: number
  readonly root: string
}

interface ParticipatingFiles {
  readonly files: readonly ChecksumAnnotationScanFile[]
  readonly enumerated: number
  readonly population: Population
  readonly packageRoots: readonly string[]
}

function findPackageRoots(repoRoot: string): readonly string[] {
  return findFiles({ cwd: repoRoot, patterns: ["**/package.json"], absolute: false }).map((rel) =>
    rel.slice(0, rel.lastIndexOf("/"))
  )
}

function loadParticipatingFiles(repoRoot: string): ParticipatingFiles {
  const enumerated = findFiles({ cwd: repoRoot, patterns: SCAN_PATTERNS, absolute: false })
  const files: ChecksumAnnotationScanFile[] = []
  const { population } = examinePopulation({
    members: enumerated.filter((rel) => isChecksumScanPath(rel)),
    unit: "scanned files",
    membership: {
      kind: "enumerated",
      because:
        "`findFiles` globs the repo root through `Bun.Glob.scanSync`, which raises ENOENT on a root that is not there, so fewer paths means fewer files on disk",
    },
    labelOf: (rel) => rel,
    siteOf: (rel) => resolve(repoRoot, rel),
    examine: (rel) => {
      const content = readFileSync(resolve(repoRoot, rel), "utf8")
      if (content.includes(CHECKSUM_ANNOTATION_MARKER)) files.push({ path: rel, content })
      return []
    },
  })
  return {
    files,
    enumerated: enumerated.length,
    population,
    packageRoots: findPackageRoots(repoRoot),
  }
}

function instructionsRootFrom(named: string | undefined): string {
  const stated = named ?? process.env.AKASHA_ROOT
  const root =
    stated === undefined || stated === ""
      ? resolve(import.meta.dir, OWN_REPO_FROM_HERE)
      : resolve(stated)
  if (!existsSync(resolve(root, TEMPLATE_DIR))) {
    throw new Error(
      `instructionsRootFrom: ${root} holds no ${TEMPLATE_DIR}, so it is not a checkout of the ` +
        "instructions repo. Every substitution site this check pairs against now stands there: " +
        "pass --instructions-root, or set AKASHA_ROOT."
    )
  }
  return root
}

function loadSeamSites(root: string): SeamCorpus {
  const rels = findFiles({ cwd: root, patterns: TEMPLATE_PATTERNS, absolute: false })
  const files: readonly ChecksumAnnotationScanFile[] = rels.map((rel) => ({
    path: rel,
    content: readFileSync(resolve(root, rel), "utf8"),
  }))
  return { ...findSeamSubstitutionSites(files), templates: files.length, root }
}

function main(): never {
  const { flags } = parseArgs(Bun.argv.slice(2), CHECK_FLAGS, { passthrough: true })

  if (
    scanChecksumAnnotationSubstitution(SEAWEEDFS_DEFECT_FIXTURE, SEAWEEDFS_FIXTURE_PACKAGE_ROOTS)
      .length === 0
  ) {
    exitOnToolError({
      error: new Error(
        "gate-integrity failure: the detector did NOT flag the known #16399 seaweedfs " +
          "defect — an emitted `checksum/s3-config` with no substitution site anywhere. It has " +
          "degraded into a no-op and would let a dead annotation ship, which is the exact failure " +
          "this gate exists to prevent."
      ),
      prefix: PREFIX,
    })
  }

  const repoRoot = flags.repoRoot != null ? resolve(flags.repoRoot) : getRepoRoot()
  const seam = loadSeamSites(instructionsRootFrom(flags.instructionsRoot))
  if (seam.templates === 0) {
    exitOnToolError({
      error: new Error(
        `gate-integrity failure: no workflow template was read under ${seam.root}/${TEMPLATE_DIR}. ` +
          "Every substitution site this check pairs against stands there, so reading none would " +
          "report every stamped annotation as unstamped."
      ),
      prefix: PREFIX,
    })
  }
  const participating = loadParticipatingFiles(repoRoot)
  if (participating.enumerated === 0) {
    exitOnToolError({
      error: new Error(
        `gate-integrity failure: the globs enumerated no files under ${repoRoot}. An ` +
          "empty population would report clean having scanned nothing."
      ),
      prefix: PREFIX,
    })
  }
  if (participating.packageRoots.length === 0) {
    exitOnToolError({
      error: new Error(
        `gate-integrity failure: no package.json found under ${repoRoot}/packages. The ` +
          "pairing scope would collapse to per-directory and flag every real pair."
      ),
      prefix: PREFIX,
    })
  }

  const violations: readonly ChecksumAnnotationViolation[] = scanChecksumAnnotationSubstitution(
    participating.files,
    participating.packageRoots,
    seam.sites
  )
  const emitCount = findChecksumAnnotationEmits(participating.files).length
  const shortfall =
    seam.unanchored.length === 0
      ? ""
      : `, ${seam.unanchored.length} substitution site(s) named no manifest and were not paired`
  const found =
    `${emitCount} constant checksum/* annotation(s) in ${participating.files.length} participating file(s), ` +
    `of ${participating.enumerated} .ts/.tsx/.sh enumerated across ${participating.packageRoots.length} package(s), ` +
    `against ${seam.sites.length} substitution site(s) read across the seam from ${seam.root} ` +
    `over ${seam.templates} workflow template(s)${shortfall}`

  process.stdout.write(`${PREFIX} resting on ${SEAM_RESTS_ON}\n`)
  exitOnResult({
    violations,
    options: {
      population: participating.population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header:
        "constant checksum/* pod-template annotation with no apply-time substitution of its own — it can never change, so it can never roll the workload it is supposed to roll",
      successMessage: `OK — ${found}, each with a substitution site of its own at apply time.`,
      footer: (count) => `${PREFIX} ${count} of ${found} without a substitution site of their own`,
      formatViolation: (v) => `${v.file}:${v.line} ${v.message}`,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }
}
