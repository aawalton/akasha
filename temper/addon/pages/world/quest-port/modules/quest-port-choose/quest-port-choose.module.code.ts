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
  readonly kind: "wayshrine" | "house"
  readonly nodeIndex: number
  readonly houseId: number
  readonly name: string
  readonly x: number
  readonly y: number
}

export interface ConditionReading {
  readonly stepIndex: number
  readonly conditionIndex: number
  readonly isVisible: boolean
  readonly isFailCondition: boolean
  readonly isComplete: boolean
}

export function objectiveCondition(
  this: void,
  conditions: readonly ConditionReading[]
): ConditionReading | undefined {
  for (const condition of conditions) {
    if (condition.isVisible && !condition.isFailCondition && !condition.isComplete) {
      return condition
    }
  }
  return undefined
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
