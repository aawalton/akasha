export interface PassedWorkflowWitness {
  readonly workflowName: string
  readonly pipelineSeq: number
}

export interface BranchResolutionInput {
  readonly pipelineSeq: number
  readonly failedWorkflowNames: readonly string[]
  readonly witnesses: readonly PassedWorkflowWitness[]
}

export interface BranchResolutionDecision {
  readonly answeredElsewhere: boolean
  readonly unwitnessed: readonly string[]
}

export function decideBranchResolution(input: BranchResolutionInput): BranchResolutionDecision {
  const failedNames = [...new Set(input.failedWorkflowNames)]
  if (failedNames.length === 0) return { answeredElsewhere: false, unwitnessed: [] }

  const answered = new Set(
    input.witnesses
      .filter((one) => one.pipelineSeq > input.pipelineSeq)
      .map((one) => one.workflowName)
  )
  const unwitnessed = failedNames.filter((name) => !answered.has(name))
  return { answeredElsewhere: unwitnessed.length === 0, unwitnessed }
}
