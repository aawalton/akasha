import type {
  Admission,
  Candidate,
  Deferral,
  Failure,
  NodeCapacity,
  Requests,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"

const PREFIX = "ci-container-dispatcher: placement"

function mib(bytes: number): string {
  return `${Math.round(bytes / 1024 ** 2)}Mi`
}

function asked(one: Requests): string {
  return `${mib(one.memoryBytes)}/${one.cpuMillis}m`
}

function nodeToken(one: NodeCapacity): string {
  return `${one.nodeName}[mf=${mib(one.memoryBytesCapacity)}/${one.cpuMillisCapacity}m rem=${mib(one.memoryBytesAvailable)}/${one.cpuMillisAvailable}m]`
}

function snapshot(nodes: readonly NodeCapacity[]): string {
  return nodes.map(nodeToken).join(" ")
}

function about(one: Candidate): string {
  return `pipelineSeq=${one.pipelineSeq} pipelineBranch=${one.pipelineBranch} stepSeq=${one.stepSeq} stepName=${one.stepName}`
}

function findNode(nodes: readonly NodeCapacity[], node: string): NodeCapacity | undefined {
  return nodes.find((one) => one.nodeName === node)
}

export function bindLine(admission: Admission, nodes: readonly NodeCapacity[]): string {
  const chosen = findNode(nodes, admission.node)
  const room =
    chosen === undefined
      ? "chosen=absent-from-snapshot"
      : `chosenMaxFree=${mib(chosen.memoryBytesCapacity)}/${chosen.cpuMillisCapacity}m chosenRem=${mib(chosen.memoryBytesAvailable)}/${chosen.cpuMillisAvailable}m`
  return `${PREFIX} bind ${about(admission.candidate)} node=${admission.node} request=${asked(admission.candidate.requests)} pipelineMax=${asked(admission.candidate.pipelineMaxRequests)} ${room} | snapshot: ${snapshot(nodes)}`
}

export function confineLine(admission: Admission): string {
  return `${PREFIX} confine ${about(admission.candidate)} node=${admission.node} request=${asked(admission.candidate.requests)} — the bound node is absent from the snapshot, so its ceiling is unknown and the container waits Pending until it returns`
}

export function deferLine(deferral: Deferral, nodes: readonly NodeCapacity[]): string {
  const bound = findNode(nodes, deferral.node)
  const room =
    bound === undefined
      ? "boundRem=n/a boundMaxFree=n/a"
      : `boundRem=${mib(bound.memoryBytesAvailable)}/${bound.cpuMillisAvailable}m boundMaxFree=${mib(bound.memoryBytesCapacity)}/${bound.cpuMillisCapacity}m`
  return `${PREFIX} defer ${about(deferral.candidate)} node=${deferral.node} request=${asked(deferral.candidate.requests)} ${room} — the bound node is there and full this tick, so the step holds dispatching and the oldest is admitted first`
}

export function neverFitLine(failure: Failure): string {
  return `${PREFIX} never-fit ${about(failure.candidate)} — ${failure.reason}`
}

export function neverFitWaitLine(candidate: Candidate, nodes: readonly NodeCapacity[]): string {
  const since =
    candidate.neverFitSince === null
      ? "first-seen"
      : `since=${new Date(candidate.neverFitSince).toISOString()}`
  return `${PREFIX} never-fit-wait ${about(candidate)} request=${asked(candidate.requests)} ${since} — never-fit has not stood long enough to fail the step, so it holds dispatching | snapshot: ${snapshot(nodes)}`
}

export function terminalAncestorLine(candidate: Candidate): string {
  return `${PREFIX} terminal-ancestor ${about(candidate)} workflowStatus=${candidate.workflowStatus} pipelineStatus=${candidate.pipelineStatus} — the step is dispatching under an ancestor that has already reached its verdict, so no container is launched for it`
}
