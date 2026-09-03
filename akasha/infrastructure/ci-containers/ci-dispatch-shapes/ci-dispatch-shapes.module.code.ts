export interface Requests {
  readonly cpuMillis: number
  readonly memoryBytes: number
}

export interface NodeCapacity {
  readonly nodeName: string
  readonly cpuMillisAvailable: number
  readonly memoryBytesAvailable: number
  readonly cpuMillisCapacity: number
  readonly memoryBytesCapacity: number
}

export interface CapacityReading {
  readonly nodes: readonly NodeCapacity[]
  readonly observedContainerNames: ReadonlySet<string>
}

export interface Candidate {
  readonly stepSeq: string
  readonly stepName: string
  readonly dependsOn: readonly string[]
  readonly workflowSeq: string
  readonly workflowSlug: string
  readonly workflowKind: string
  readonly workflowStatus: string
  readonly pipelineSeq: string
  readonly pipelineStatus: string
  readonly pipelineBranch: string
  readonly pipelineCommit: string
  readonly pipelineInstructionsCommit: string
  readonly inputsHash: string | null
  readonly assignedNode: string | null
  readonly definition: Readonly<Record<string, unknown>>
  readonly requests: Requests
  readonly pipelineMaxRequests: Requests
  readonly dispatchWaitSince: number | null
  readonly neverFitSince: number | null
}

export interface Admission {
  readonly candidate: Candidate
  readonly node: string
  readonly pinned: boolean
  readonly confined: boolean
  readonly newAssignment: boolean
}

export interface Deferral {
  readonly candidate: Candidate
  readonly node: string
}

export interface Failure {
  readonly candidate: Candidate
  readonly reason: string
}

export interface Decision {
  readonly toCreate: readonly Admission[]
  readonly toFail: readonly Failure[]
  readonly toDefer: readonly Deferral[]
  readonly toNeverFitWait: readonly Candidate[]
  readonly toSkipTerminalAncestor: readonly Candidate[]
  readonly toHeldNoCapacity: readonly Candidate[]
}

export interface Reservation {
  readonly containerName: string
  readonly node: string
  readonly cpuMillis: number
  readonly memoryBytes: number
  readonly admittedAtMs: number
}

export type Ledger = readonly Reservation[]

export interface ContainerPayload {
  readonly containerName: string
  readonly manifest: Record<string, unknown>
}

export const DEFAULT_REQUESTS: Requests = {
  cpuMillis: 100,
  memoryBytes: 512 * 1024 ** 2,
}

export function isRecord(one: unknown): one is Record<string, unknown> {
  return one !== null && typeof one === "object" && !Array.isArray(one)
}

export function textList(one: unknown): readonly string[] {
  return Array.isArray(one) ? one.filter((each): each is string => typeof each === "string") : []
}
