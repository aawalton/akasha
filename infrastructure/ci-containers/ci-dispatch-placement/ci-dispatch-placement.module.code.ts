import type {
  Admission,
  Candidate,
  Decision,
  Deferral,
  Failure,
  NodeCapacity,
  Requests,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"

export const MAIN_BRANCH = "main"

export const CI_RESERVED_NODE = "node-06"

export const NEVER_FIT_PERSIST_MS = 120_000

const TERMINAL_PIPELINE_STATUSES: ReadonlySet<string> = new Set([
  "passed",
  "failed",
  "answered-elsewhere",
  "overtaken",
])

const TERMINAL_WORKFLOW_STATUSES: ReadonlySet<string> = new Set([
  "passed",
  "failed",
  "blocked",
  "skipped",
  "answered-elsewhere",
  "overtaken",
])

export function onMainBranch(branch: string): boolean {
  return branch === MAIN_BRANCH
}

interface Remaining {
  cpu: number
  mem: number
}

interface Placement {
  readonly node: string
  readonly pinned: boolean
  readonly confined: boolean
}

type PlacementDecision =
  | { readonly kind: "place"; readonly placement: Placement }
  | { readonly kind: "fail"; readonly reason: string }
  | { readonly kind: "defer"; readonly node: string }
  | { readonly kind: "halt" }

function fits(req: Requests, room: Remaining): boolean {
  return req.cpuMillis <= room.cpu && req.memoryBytes <= room.mem
}

function headroomRatio(rem: number, req: number): number {
  return req <= 0 ? Number.POSITIVE_INFINITY : rem / req
}

function mostHeadroomFitting(
  req: Requests,
  remaining: ReadonlyMap<string, Remaining>,
  ordered: readonly string[]
): string | undefined {
  let best: string | undefined
  let bestBottleneck = Number.NEGATIVE_INFINITY
  let bestSlack = Number.NEGATIVE_INFINITY
  for (const name of ordered) {
    const room = remaining.get(name)
    if (room === undefined || !fits(req, room)) continue
    const bottleneck = Math.min(
      headroomRatio(room.cpu, req.cpuMillis),
      headroomRatio(room.mem, req.memoryBytes)
    )
    const slack = Math.max(
      headroomRatio(room.cpu, req.cpuMillis),
      headroomRatio(room.mem, req.memoryBytes)
    )
    if (
      best === undefined ||
      bottleneck > bestBottleneck ||
      (bottleneck === bestBottleneck && slack > bestSlack)
    ) {
      best = name
      bestBottleneck = bottleneck
      bestSlack = slack
    }
  }
  return best
}

function formatMemory(bytes: number): string {
  const gi = bytes / 1024 ** 3
  if (gi >= 1) return `${gi.toFixed(1)}Gi`
  return `${(bytes / 1024 ** 2).toFixed(0)}Mi`
}

function neverFitBoundReason(req: Requests, node: string, ceiling: Remaining): string {
  const shortfall =
    req.memoryBytes > ceiling.mem
      ? `max-free ${formatMemory(ceiling.mem)} < request ${formatMemory(req.memoryBytes)}`
      : `max-free ${ceiling.cpu}m < request ${req.cpuMillis}m`
  return `never-fits: ${node} bound-node ${shortfall} (allocatable minus standing residents); the step can never schedule there`
}

function neverFitPipelineReason(
  most: Requests,
  ceilings: ReadonlyMap<string, Remaining>,
  ordered: readonly string[]
): string {
  let largest = 0
  for (const name of ordered) {
    const ceiling = ceilings.get(name)
    if (ceiling !== undefined && ceiling.mem > largest) largest = ceiling.mem
  }
  return `never-fits: the pipeline's largest step asks ${formatMemory(most.memoryBytes)}, past every ci node's max-free (largest ${formatMemory(largest)}); no node can ever host it`
}

function boundNode(
  candidate: Candidate,
  pinnedThisTick: ReadonlyMap<string, string>
): string | undefined {
  if (onMainBranch(candidate.pipelineBranch)) return CI_RESERVED_NODE
  if (candidate.assignedNode !== null) return candidate.assignedNode
  return pinnedThisTick.get(candidate.pipelineSeq)
}

function resolvePlacement(
  candidate: Candidate,
  remaining: ReadonlyMap<string, Remaining>,
  ceilings: ReadonlyMap<string, Remaining>,
  ordered: readonly string[],
  pinnedThisTick: ReadonlyMap<string, string>,
  stickyPinning: boolean
): PlacementDecision {
  if (!stickyPinning) {
    const anywhere = mostHeadroomFitting(candidate.requests, remaining, ordered)
    if (anywhere !== undefined) {
      return { kind: "place", placement: { node: anywhere, pinned: false, confined: false } }
    }
    return { kind: "halt" }
  }
  const bound = boundNode(candidate, pinnedThisTick)
  if (bound !== undefined) {
    const room = remaining.get(bound)
    if (room !== undefined && fits(candidate.requests, room)) {
      return { kind: "place", placement: { node: bound, pinned: true, confined: false } }
    }
    const ceiling = ceilings.get(bound)
    if (ceiling !== undefined && !fits(candidate.requests, ceiling)) {
      return { kind: "fail", reason: neverFitBoundReason(candidate.requests, bound, ceiling) }
    }
    if (room !== undefined) return { kind: "defer", node: bound }
    return { kind: "place", placement: { node: bound, pinned: false, confined: true } }
  }
  const everFitting = ordered.filter((name) => {
    const ceiling = ceilings.get(name)
    return ceiling !== undefined && fits(candidate.pipelineMaxRequests, ceiling)
  })
  if (everFitting.length === 0) {
    return {
      kind: "fail",
      reason: neverFitPipelineReason(candidate.pipelineMaxRequests, ceilings, ordered),
    }
  }
  const pick = mostHeadroomFitting(candidate.requests, remaining, everFitting)
  if (pick !== undefined) {
    return { kind: "place", placement: { node: pick, pinned: true, confined: false } }
  }
  return { kind: "halt" }
}

const NOTHING_TO_DO: Decision = {
  toCreate: [],
  toFail: [],
  toDefer: [],
  toNeverFitWait: [],
  toSkipTerminalAncestor: [],
  toHeldNoCapacity: [],
}

export function selectNext(
  candidates: readonly Candidate[],
  nodes: readonly NodeCapacity[],
  options: { readonly now: number; readonly stickyPinning: boolean }
): Decision {
  const toSkipTerminalAncestor: Candidate[] = []
  const eligible: Candidate[] = []
  for (const one of candidates) {
    if (
      TERMINAL_PIPELINE_STATUSES.has(one.pipelineStatus) ||
      TERMINAL_WORKFLOW_STATUSES.has(one.workflowStatus)
    ) {
      toSkipTerminalAncestor.push(one)
    } else {
      eligible.push(one)
    }
  }
  if (nodes.length === 0) return { ...NOTHING_TO_DO, toSkipTerminalAncestor }

  const sorted = [...eligible].sort((a, b) => {
    const mainA = onMainBranch(a.pipelineBranch)
    const mainB = onMainBranch(b.pipelineBranch)
    if (mainA !== mainB) return mainA ? -1 : 1
    if (a.pipelineSeq !== b.pipelineSeq) return Number(a.pipelineSeq) - Number(b.pipelineSeq)
    return Number(a.stepSeq) - Number(b.stepSeq)
  })

  const remaining = new Map<string, Remaining>()
  const ceilings = new Map<string, Remaining>()
  for (const node of nodes) {
    remaining.set(node.nodeName, {
      cpu: node.cpuMillisAvailable,
      mem: node.memoryBytesAvailable,
    })
    ceilings.set(node.nodeName, {
      cpu: node.cpuMillisCapacity,
      mem: node.memoryBytesCapacity,
    })
  }
  const ordered = nodes.map((one) => one.nodeName)
  const pinnedThisTick = new Map<string, string>()

  const toCreate: Admission[] = []
  const toFail: Failure[] = []
  const toDefer: Deferral[] = []
  const toNeverFitWait: Candidate[] = []
  const toHeldNoCapacity: Candidate[] = []

  for (let i = 0; i < sorted.length; i += 1) {
    const candidate = sorted[i]
    if (candidate === undefined) continue
    const decision = resolvePlacement(
      candidate,
      remaining,
      ceilings,
      ordered,
      pinnedThisTick,
      options.stickyPinning
    )
    if (decision.kind === "fail") {
      const since = candidate.neverFitSince
      if (since !== null && options.now - since >= NEVER_FIT_PERSIST_MS) {
        toFail.push({ candidate, reason: decision.reason })
      } else {
        toNeverFitWait.push(candidate)
      }
      continue
    }
    if (decision.kind === "defer") {
      toDefer.push({ candidate, node: decision.node })
      continue
    }
    if (decision.kind === "halt") {
      toHeldNoCapacity.push(...sorted.slice(i))
      break
    }
    const placement = decision.placement
    const room = remaining.get(placement.node)
    if (room === undefined && !placement.confined) break
    const onBranch = !onMainBranch(candidate.pipelineBranch)
    toCreate.push({
      candidate,
      node: placement.node,
      pinned: placement.pinned,
      confined: placement.confined,
      newAssignment:
        onBranch &&
        placement.pinned &&
        candidate.assignedNode === null &&
        !pinnedThisTick.has(candidate.pipelineSeq),
    })
    if (room !== undefined) {
      room.cpu -= candidate.requests.cpuMillis
      room.mem -= candidate.requests.memoryBytes
    }
    if (onBranch && placement.pinned) pinnedThisTick.set(candidate.pipelineSeq, placement.node)
  }

  return {
    toCreate,
    toFail,
    toDefer,
    toNeverFitWait,
    toSkipTerminalAncestor,
    toHeldNoCapacity,
  }
}
