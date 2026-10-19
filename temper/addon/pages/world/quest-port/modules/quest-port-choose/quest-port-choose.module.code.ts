export type NodeKind = "wayshrine" | "house" | "other"

export interface NodeReading {
  readonly nodeIndex: number
  readonly name: string
  readonly kind: NodeKind
  readonly known: boolean
  readonly shownOnMap: boolean
  readonly locked: boolean
  readonly outboundOnly: boolean
  readonly houseId: number
  readonly houseOwned: boolean
  readonly x: number
  readonly y: number
}

export interface PortTarget {
  readonly kind: "wayshrine" | "house" | "instance"
  readonly nodeIndex: number
  readonly houseId: number
  readonly name: string
  readonly x: number
  readonly y: number
}

export interface ConditionReading {
  readonly conditionIndex: number
  readonly isComplete: boolean
}

export interface StepReading {
  readonly stepIndex: number
  readonly isEnding: boolean
  readonly conditions: readonly ConditionReading[]
}

export type MapAttempt =
  | { readonly kind: "condition"; readonly stepIndex: number; readonly conditionIndex: number }
  | { readonly kind: "ending"; readonly stepIndex: number }

export function mapAttempts(this: void, steps: readonly StepReading[]): MapAttempt[] {
  const attempts: MapAttempt[] = []
  for (const step of steps) {
    for (const condition of step.conditions) {
      if (condition.isComplete) continue
      attempts.push({
        kind: "condition",
        stepIndex: step.stepIndex,
        conditionIndex: condition.conditionIndex,
      })
    }
    if (step.isEnding) attempts.push({ kind: "ending", stepIndex: step.stepIndex })
  }
  for (const step of steps) {
    for (const condition of step.conditions) {
      if (!condition.isComplete) continue
      attempts.push({
        kind: "condition",
        stepIndex: step.stepIndex,
        conditionIndex: condition.conditionIndex,
      })
    }
  }
  return attempts
}

function targetOf(this: void, node: NodeReading): PortTarget | undefined {
  if (!node.shownOnMap || node.locked || node.outboundOnly) return undefined
  if (node.kind === "wayshrine" && node.known) {
    return {
      kind: "wayshrine",
      nodeIndex: node.nodeIndex,
      houseId: 0,
      name: node.name,
      x: node.x,
      y: node.y,
    }
  }
  if (node.kind === "house" && node.houseOwned && node.houseId > 0) {
    return {
      kind: "house",
      nodeIndex: node.nodeIndex,
      houseId: node.houseId,
      name: node.name,
      x: node.x,
      y: node.y,
    }
  }
  return undefined
}

export function portTargets(this: void, nodes: readonly NodeReading[]): PortTarget[] {
  const targets: PortTarget[] = []
  for (const node of nodes) {
    const target = targetOf(node)
    if (target !== undefined) targets.push(target)
  }
  return targets
}

export function instanceTarget(
  this: void,
  nodes: readonly NodeReading[],
  instanceName: string
): PortTarget | undefined {
  const wanted = instanceName.toLowerCase()
  if (wanted === "") return undefined
  for (const node of nodes) {
    if (node.kind !== "other" || !node.known || node.locked || node.outboundOnly) continue
    if (node.name.toLowerCase() !== wanted) continue
    return {
      kind: "instance",
      nodeIndex: node.nodeIndex,
      houseId: 0,
      name: node.name,
      x: node.x,
      y: node.y,
    }
  }
  return undefined
}

export const MAX_TARGET_CLIMBS = 3

export function climbForTargets(this: void, onOverlandMap: boolean, climbs: number): boolean {
  return !onOverlandMap && climbs < MAX_TARGET_CLIMBS
}

export function nearestTarget(
  this: void,
  targets: readonly PortTarget[],
  x: number,
  y: number
): PortTarget | undefined {
  let nearest: PortTarget | undefined
  let nearestDistance = 0
  for (const target of targets) {
    const dx = target.x - x
    const dy = target.y - y
    const distance = dx * dx + dy * dy
    if (nearest === undefined || distance < nearestDistance) {
      nearest = target
      nearestDistance = distance
    }
  }
  return nearest
}
