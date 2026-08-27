#!/usr/bin/env bun

import { findFiles } from "../../../../tools/lib/check-workflow/file-finder"
import { examineFilePopulation } from "../../../../tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root"
import {
  type FieldClassification,
  findStepConfigFieldViolations,
  parseInterfaceFields,
  type SourceFile,
} from "../lib/step-config-field-consumption"
import { exitOnResult, exitOnToolError } from "../../../../tools/lib/check-workflow/violation-reporter"

const POD_SPEC_SRC: readonly string[] = [
  "packages/infra/ci/orchestrator/src",
  "packages/infra/ci/step-script/src",
]
const DECLARATION_ROOT = "packages/infra/ci/orchestrator/src"
const DECLARATION_PATH = "ci-pod-dispatcher/pod-spec-step-config.ts"
const INTERFACE_NAME = "StepConfig"

const STEP_CONFIG_FIELD_CLASSIFICATIONS: readonly FieldClassification[] = [
  { field: "name", disposition: "consumed" },
  { field: "image", disposition: "consumed" },
  { field: "commands", disposition: "consumed" },
  { field: "environment", disposition: "consumed" },
  { field: "serviceAccountName", disposition: "consumed" },
  {
    field: "volumes",
    disposition: "inert",
    reason:
      "Read only by @infra/local-executor (execute-step.ts:154), where `volumes` containing " +
      "`ci-storage:/ci-storage` is one of three signals that make a local step rewrite " +
      "`/ci-storage` paths to the local cache directory. Cluster-side it cannot affect the pod " +
      "spec: buildPodVolumes (ci-pod-dispatcher/pod-spec-volumes.ts) mounts `ci-storage` at " +
      "`/ci-storage` and `tmp` at `/tmp` on every pod unconditionally, and takes its only " +
      "per-step input from `secretMounts`. A step declaring this volume and a step omitting it " +
      "get the identical pod. Reclassify it as consumed the moment the pod builder reads it.",
  },
  { field: "resources", disposition: "consumed" },
  { field: "dependsOn", disposition: "consumed" },
  { field: "shell", disposition: "consumed" },
  { field: "outputs", disposition: "consumed" },
  { field: "runAsUser", disposition: "consumed" },
  { field: "secretMounts", disposition: "consumed" },
  {
    field: "skipIfTagExists",
    disposition: "inert",
    reason:
      "Implemented only in @infra/local-executor (execute-step.ts:79-89, via the checkTagExists registry probe) — the bootstrap-CLI and benchmark path. The cluster engine materializes it, copies it here in launch-builder.ts, and never reads it, so it gates no build. Its one live cluster-side effect is the inverse of a skip: stepBypassesClosureGate (ci/worker) keeps any step carrying it, bypassing the closure-miss drop — that read is of the step page's stepConfig bag, not of this interface. Implement-or-delete is #16404; measured evidence is on #16402. Do not implement it without settling the pinned-tag discipline in packages/infra/k8s/src/postgres/cronjob-service-steps.ts first — arming this gate makes those three CronJob services ship stale images on green deploys.",
  },
]

function main(): never {
  const repoRoot = getRepoRoot()
  const files: string[] = []
  for (const root of POD_SPEC_SRC) {
    const found = findFiles({
      cwd: `${repoRoot}/${root}`,
      patterns: ["**/*.ts"],
      absolute: false,
    }).filter((r) => !r.endsWith(".test.ts"))
    if (found.length === 0) {
      exitOnToolError({
        error: new Error(
          `${root} holds no source file, so this check reads a pod-spec source tree that has moved or emptied — a field read only from there would read as populated and never consumed. Point this reach at where that code stands now.`
        ),
        prefix: "[step-config-field-consumption]",
      })
    }
    for (const rel of found) files.push(`${root}/${rel}`)
  }

  const { population, violations: sources } = examineFilePopulation<SourceFile>({
    files,
    unit: "pod-spec source files",
    membership: {
      kind: "enumerated",
      because:
        "`findFiles` globs each root with `Bun.Glob.scanSync`, which raises ENOENT on a " +
        "root that is not there rather than returning nothing, each root is refused " +
        "outright when it holds no source file, and the one filter after it drops test " +
        "files by name — so fewer members means fewer `.ts` files under the trees that " +
        "turn a StepConfig into a pod",
    },
    pathOf: (path) => `${repoRoot}/${path}`,
    scan: (path, content) => [{ path, content }],
  })

  const declarationPath = `${DECLARATION_ROOT}/${DECLARATION_PATH}`
  const declaration = sources.find((s) => s.path === declarationPath)
  if (declaration === undefined) {
    exitOnToolError({
      error: new Error(
        `${declarationPath} not found — the check's declaration anchor moved; update DECLARATION_PATH.`
      ),
      prefix: "[step-config-field-consumption]",
    })
  }

  const fields = parseInterfaceFields(declaration.content, INTERFACE_NAME)
  if (fields.length === 0) {
    exitOnToolError({
      error: new Error(
        `no fields parsed from interface ${INTERFACE_NAME} in ${declarationPath} — the interface was renamed or reshaped; a silently empty field set would make this check vacuous.`
      ),
      prefix: "[step-config-field-consumption]",
    })
  }

  const violations = findStepConfigFieldViolations({
    fields,
    sources,
    declarationPath,
    classifications: STEP_CONFIG_FIELD_CLASSIFICATIONS,
  })

  exitOnResult({
    violations: [...violations],
    options: {
      population,
      prefix: "[step-config-field-consumption]",
      header:
        "a pod-spec StepConfig field's declared disposition disagrees with the source — a field that is populated but never read cannot affect the pod spec, and a stale classification hides that",
      successMessage: `All ${fields.length} StepConfig fields match their declared disposition.`,
      formatViolation: (v) => `${v.field}: ${v.message}`,
    },
  })
}

if (import.meta.main) {
  try {
    main()
  } catch (err) {
    console.error("[step-config-field-consumption] Unexpected error:", err)
    process.exit(2)
  }
}
