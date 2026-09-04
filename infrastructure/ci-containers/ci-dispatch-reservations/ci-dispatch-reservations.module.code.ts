import type {
  Ledger,
  NodeCapacity,
  Requests,
  Reservation,
} from "../ci-dispatch-shapes/ci-dispatch-shapes.module.code.ts"

export const RESERVATION_TTL_MS = 300_000

export interface Admitted {
  readonly containerName: string
  readonly node: string
  readonly requests: Requests
}

export function reconcileLedger(
  standing: Ledger,
  observedContainerNames: ReadonlySet<string>,
  nowMs: number,
  ttlMs: number
): Ledger {
  return standing.filter(
    (one) => !observedContainerNames.has(one.containerName) && nowMs - one.admittedAtMs < ttlMs
  )
}

export function applyReservations(
  nodes: readonly NodeCapacity[],
  ledger: Ledger
): readonly NodeCapacity[] {
  if (ledger.length === 0) return nodes
  const byNode = new Map<string, { cpu: number; mem: number }>()
  for (const one of ledger) {
    const held = byNode.get(one.node) ?? { cpu: 0, mem: 0 }
    held.cpu += one.cpuMillis
    held.mem += one.memoryBytes
    byNode.set(one.node, held)
  }
  return nodes.map((node) => {
    const held = byNode.get(node.nodeName)
    if (held === undefined) return node
    return {
      ...node,
      cpuMillisAvailable: Math.max(0, node.cpuMillisAvailable - held.cpu),
      memoryBytesAvailable: Math.max(0, node.memoryBytesAvailable - held.mem),
    }
  })
}

export function recordAdmissions(
  standing: Ledger,
  created: readonly Admitted[],
  nowMs: number
): Ledger {
  if (created.length === 0) return standing
  const seen = new Set<string>(standing.map((one) => one.containerName))
  const added: Reservation[] = []
  for (const one of created) {
    if (seen.has(one.containerName)) continue
    seen.add(one.containerName)
    added.push({
      containerName: one.containerName,
      node: one.node,
      cpuMillis: one.requests.cpuMillis,
      memoryBytes: one.requests.memoryBytes,
      admittedAtMs: nowMs,
    })
  }
  return added.length === 0 ? standing : [...standing, ...added]
}
