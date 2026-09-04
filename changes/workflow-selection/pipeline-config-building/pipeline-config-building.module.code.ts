import type { PopulationEntry } from "@akasha/old-graph/old-graph-queries"
import type { Row } from "@akasha/pages-system/page-derive-shape"
import { listOf, textOf } from "../ci-page-row-reads/ci-page-row-reads.module.code.ts"
import type {
  PipelineConfig,
  WorkflowConfig,
} from "../workflow-config/workflow-config.module.code.ts"

const COMMIT_KEY = "commit"

const ONLY_CHECK_NAMES_KEY = "only-check-names"

const CHECK_WORKFLOW = "check"

const INPUTS_HASH = /^[0-9a-f]{12}$/

export interface PipelineLike {
  readonly changedFiles?: readonly string[]
}

export interface WorkflowLike {
  readonly name: string
  readonly isDisabled?: boolean
  readonly kind?: string
  readonly dependsOn?: readonly string[]
  readonly whenBranch?: string
  readonly alwaysRun?: boolean
}

export interface StepLike {
  readonly name: string
  readonly dependsOn?: readonly string[]
  readonly whenConditions?: { readonly status: readonly string[] }
  readonly alwaysRun?: boolean
}

export interface WorkflowStepDefinition {
  name: string
  dependsOn?: readonly string[]
  whenConditions?: { readonly status: readonly string[] }
  alwaysRun?: boolean
}

export interface DecideWorkflowConfig {
  readonly stepDefinitions: readonly WorkflowStepDefinition[]
  readonly commitSha: string
}

export function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
}

export function asStringArray(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out: string[] = []
  for (const one of value) {
    if (typeof one !== "string") return undefined
    out.push(one)
  }
  return out
}

export function readDispatchNodeTypes(raw: unknown): readonly PopulationEntry[] | undefined {
  if (!Array.isArray(raw)) return undefined
  const out: PopulationEntry[] = []
  for (const entry of raw) {
    if (typeof entry === "string") {
      out.push(entry)
      continue
    }
    if (isPlainRecord(entry) && typeof entry.kind === "string" && typeof entry.under === "string") {
      out.push({ kind: entry.kind, under: entry.under })
    }
  }
  return out.length > 0 ? out : undefined
}

export function buildPipelineConfig(
  pipeline: PipelineLike,
  workflows: readonly WorkflowLike[]
): PipelineConfig {
  const held: WorkflowConfig[] = []
  for (const workflow of workflows) {
    if (workflow.isDisabled === true) continue
    const out: WorkflowConfig = { name: workflow.name, config: {} }
    if (workflow.kind !== undefined) out.kind = workflow.kind
    if (workflow.dependsOn !== undefined) out.dependsOn = workflow.dependsOn
    if (workflow.whenBranch !== undefined) out.whenBranch = workflow.whenBranch
    if (workflow.alwaysRun === true) out.alwaysRun = true
    held.push(out)
  }
  return { workflows: held, changedPaths: pipeline.changedFiles ?? [] }
}

export function buildPipelineConfigFromRaw(pipeline: PipelineLike, raw: unknown): PipelineConfig {
  const workflows: WorkflowConfig[] = []
  for (const entry of Array.isArray(raw) ? raw : []) {
    if (!isPlainRecord(entry)) continue
    if (entry.disabled === true) continue
    const name = typeof entry.name === "string" ? entry.name : undefined
    if (name === undefined) continue
    const one: WorkflowConfig = { name, config: {} }
    if (typeof entry.kind === "string") one.kind = entry.kind
    const dependsOn = asStringArray(entry.dependsOn)
    if (dependsOn !== undefined) one.dependsOn = dependsOn
    if (typeof entry.whenBranch === "string") one.whenBranch = entry.whenBranch
    if (typeof entry.alwaysRun === "boolean") one.alwaysRun = entry.alwaysRun
    const dispatchNodes = asStringArray(entry.dispatchNodes)
    if (dispatchNodes !== undefined) one.dispatchNodes = dispatchNodes
    const dispatchNodeTypes = readDispatchNodeTypes(entry.dispatchNodeTypes)
    if (dispatchNodeTypes !== undefined) one.dispatchNodeTypes = dispatchNodeTypes
    if (isPlainRecord(entry.config)) one.config = entry.config
    if (Array.isArray(entry.steps)) one.config = { ...one.config, stepDefinitions: entry.steps }
    if (typeof entry.inputsHash === "string" && INPUTS_HASH.test(entry.inputsHash)) {
      one.config = { ...one.config, inputsHash: entry.inputsHash }
    }
    workflows.push(one)
  }
  return { workflows, changedPaths: pipeline.changedFiles ?? [] }
}

export function buildWorkflowConfig(
  workflow: WorkflowLike,
  childSteps: readonly StepLike[],
  pipelinePage: Row | undefined
): DecideWorkflowConfig {
  const everyStep: readonly WorkflowStepDefinition[] = childSteps.map((step) => {
    const one: WorkflowStepDefinition = { name: step.name }
    if (step.dependsOn !== undefined) one.dependsOn = step.dependsOn
    if (step.whenConditions !== undefined) one.whenConditions = step.whenConditions
    if (step.alwaysRun === true) one.alwaysRun = true
    return one
  })
  const onlyCheckNames =
    pipelinePage === undefined ? [] : listOf(pipelinePage, ONLY_CHECK_NAMES_KEY)
  const stepDefinitions =
    onlyCheckNames.length > 0 && workflow.name === CHECK_WORKFLOW
      ? everyStep.filter((one) => onlyCheckNames.includes(one.name))
      : everyStep
  const commitSha = pipelinePage === undefined ? "" : (textOf(pipelinePage, COMMIT_KEY) ?? "")
  return { stepDefinitions, commitSha }
}
