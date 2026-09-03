import { patchPage, patchState, writePage } from "@akasha/markdown-pages/page-write"
import type { Value } from "@akasha/markdown-pages/page-write-values"
import type { Where } from "@akasha/markdown-pages/page-write-where"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { PIPELINE } from "../creator-page-reading/creator-page-reading.module.code.ts"
import {
  PIPELINE_SEQS,
  STEP_SEQS,
  takeSeqsOf,
  WORKFLOW_SEQS,
} from "../pipeline-seqs/pipeline-seqs.module.code.ts"

const WORKFLOW = "workflow"

const STEP = "step"

export interface StepPlan {
  readonly title: string
  readonly dependsOn: readonly string[]
  readonly whenConditions: readonly string[]
  readonly alwaysRuns: boolean
  readonly definition: Readonly<Record<string, unknown>>
}

export interface WorkflowPlan {
  readonly name: string
  readonly kind: string | null
  readonly dependsOn: readonly string[]
  readonly whenBranch: string | null
  readonly alwaysRuns: boolean
  readonly inputsHash: string | null
  readonly changedFiles: readonly string[]
  readonly steps: readonly StepPlan[]
}

export interface PipelinePlan {
  readonly branch: string
  readonly commit: string
  readonly instructionsCommit: string
  readonly changedFiles: readonly string[]
  readonly treeHash: string | null
  readonly mainPredecessorSeqs: readonly number[]
  readonly overtakenSeqs: readonly number[]
  readonly workflows: readonly WorkflowPlan[]
}

export interface Created {
  readonly seq: number
  readonly workflowCount: number
  readonly stepCount: number
}

type Values = Record<string, Value>

function landed(at: Where | null, pageType: string, seq: number): undefined {
  if (at === null) {
    throw new Error(
      `main-pipeline-creator: ${pageType} #${seq} was not written — \`${pageType}\` names no page ` +
        "type whose pages are files in a repository this can address"
    )
  }
}

function pipelineValues(plan: PipelinePlan, seq: number): Values {
  const values: Values = {
    seq,
    status: "pending",
    branch: plan.branch,
    commit: plan.commit,
    "instructions-commit": plan.instructionsCommit,
    "changed-files": plan.changedFiles,
  }
  if (plan.treeHash !== null) values["tree-hash"] = plan.treeHash
  if (plan.mainPredecessorSeqs.length > 0) {
    values["main-predecessor-seqs"] = plan.mainPredecessorSeqs.map(String)
  }
  return values
}

function workflowValues(plan: WorkflowPlan, pipelineSeq: number, seq: number): Values {
  const values: Values = {
    seq,
    status: "pending",
    "pipeline-seq": pipelineSeq,
    slug: plan.name,
  }
  if (plan.kind !== null) values.kind = plan.kind
  if (plan.dependsOn.length > 0) values["depends-on"] = plan.dependsOn
  if (plan.whenBranch !== null) values["when-branch"] = plan.whenBranch
  if (plan.alwaysRuns) values["always-runs"] = true
  if (plan.inputsHash !== null) values["inputs-hash"] = plan.inputsHash
  if (plan.changedFiles.length > 0) values["changed-files"] = plan.changedFiles
  return values
}

function stepValues(plan: StepPlan, pipelineSeq: number, workflowSeq: number, seq: number): Values {
  const values: Values = {
    seq,
    title: plan.title,
    "pipeline-seq": pipelineSeq,
    "workflow-seq": workflowSeq,
  }
  if (plan.alwaysRuns) values["always-runs"] = true
  if (plan.dependsOn.length > 0) values["depends-on"] = plan.dependsOn
  if (plan.whenConditions.length > 0) values["when-conditions"] = plan.whenConditions
  return values
}

export function createPipelineTree(roots: Roots, plan: PipelinePlan): Created {
  const workflowCount = plan.workflows.length
  const stepCount = plan.workflows.reduce((held, one) => held + one.steps.length, 0)

  const pipelineSeq = takeSeqsOf(PIPELINE_SEQS, 1)
  const firstWorkflowSeq = workflowCount === 0 ? 0 : takeSeqsOf(WORKFLOW_SEQS, workflowCount)
  const firstStepSeq = stepCount === 0 ? 0 : takeSeqsOf(STEP_SEQS, stepCount)

  let workflowSeq = firstWorkflowSeq
  let stepSeq = firstStepSeq
  for (const workflow of plan.workflows) {
    landed(
      writePage(
        roots,
        WORKFLOW,
        String(workflowSeq),
        workflowValues(workflow, pipelineSeq, workflowSeq)
      ),
      WORKFLOW,
      workflowSeq
    )
    for (const step of workflow.steps) {
      const name = String(stepSeq)
      landed(
        writePage(roots, STEP, name, stepValues(step, pipelineSeq, workflowSeq, stepSeq)),
        STEP,
        stepSeq
      )
      landed(patchState(roots, STEP, name, { definition: step.definition }), STEP, stepSeq)
      stepSeq += 1
    }
    workflowSeq += 1
  }

  landed(
    writePage(roots, PIPELINE, String(pipelineSeq), pipelineValues(plan, pipelineSeq)),
    PIPELINE,
    pipelineSeq
  )

  for (const seq of plan.overtakenSeqs) {
    landed(
      patchPage(roots, PIPELINE, String(seq), {
        status: "overtaken",
        "overtaken-by-seq": pipelineSeq,
      }),
      PIPELINE,
      seq
    )
  }

  return { seq: pipelineSeq, workflowCount, stepCount }
}
