export interface CycleFinding<N> {
  readonly nodes: readonly N[]
}

interface Frame {
  readonly key: string
  readonly successors: readonly string[]
  next: number
  childKey: string | null
}

export function findCycles<N>(
  graph: Map<N, Iterable<N>>,
  keyOf: (n: N) => string
): readonly CycleFinding<N>[] {
  const nodeByKey = new Map<string, N>()
  const adjByKey = new Map<string, readonly string[]>()
  for (const [node, succIterable] of graph) {
    const key = keyOf(node)
    nodeByKey.set(key, node)
    const succKeys: string[] = []
    for (const target of succIterable) {
      succKeys.push(keyOf(target))
    }
    adjByKey.set(key, succKeys)
  }

  const indexOf = new Map<string, number>()
  const lowlinkOf = new Map<string, number>()
  const onStack = new Set<string>()
  const sccStack: string[] = []
  let nextIndex = 0

  const sccsContainingCycle: string[][] = []

  const rootKeys: string[] = []
  for (const node of graph.keys()) {
    rootKeys.push(keyOf(node))
  }

  for (const rootKey of rootKeys) {
    if (indexOf.has(rootKey)) continue
    iterativeStrongconnect(rootKey)
  }

  function iterativeStrongconnect(startKey: string): undefined {
    const work: Frame[] = []
    const pushFrame = (nodeKey: string): undefined => {
      indexOf.set(nodeKey, nextIndex)
      lowlinkOf.set(nodeKey, nextIndex)
      nextIndex++
      sccStack.push(nodeKey)
      onStack.add(nodeKey)
      const successors = adjByKey.get(nodeKey) ?? []
      work.push({ key: nodeKey, successors, next: 0, childKey: null })
    }
    pushFrame(startKey)

    while (work.length > 0) {
      const top = work[work.length - 1]
      if (top === undefined) break

      if (top.childKey !== null) {
        const childLow = lowlinkOf.get(top.childKey)
        const ownLow = lowlinkOf.get(top.key)
        if (childLow !== undefined && ownLow !== undefined && childLow < ownLow) {
          lowlinkOf.set(top.key, childLow)
        }
        top.childKey = null
      }

      if (top.next < top.successors.length) {
        const wKey = top.successors[top.next]
        top.next++
        if (wKey === undefined) continue
        if (!indexOf.has(wKey)) {
          if (!adjByKey.has(wKey)) continue
          top.childKey = wKey
          pushFrame(wKey)
          continue
        }
        if (onStack.has(wKey)) {
          const wIndex = indexOf.get(wKey)
          const ownLow = lowlinkOf.get(top.key)
          if (wIndex !== undefined && ownLow !== undefined && wIndex < ownLow) {
            lowlinkOf.set(top.key, wIndex)
          }
        }
        continue
      }

      work.pop()
      const topIndex = indexOf.get(top.key)
      const topLow = lowlinkOf.get(top.key)
      if (topIndex !== undefined && topLow !== undefined && topLow === topIndex) {
        const scc: string[] = []
        while (sccStack.length > 0) {
          const popped = sccStack.pop()
          if (popped === undefined) break
          onStack.delete(popped)
          scc.push(popped)
          if (popped === top.key) break
        }
        if (scc.length > 1) {
          sccsContainingCycle.push(scc)
        } else if (scc.length === 1) {
          const only = scc[0]
          if (only !== undefined) {
            const succs = adjByKey.get(only) ?? []
            if (succs.includes(only)) sccsContainingCycle.push(scc)
          }
        }
      }
    }
  }

  const findings: CycleFinding<N>[] = []
  for (const scc of sccsContainingCycle) {
    const sortedKeys = [...scc].sort()
    const nodes: N[] = []
    for (const k of sortedKeys) {
      const n = nodeByKey.get(k)
      if (n !== undefined) nodes.push(n)
    }
    findings.push({ nodes })
  }
  findings.sort((a, b) => {
    const aFirst = a.nodes[0]
    const bFirst = b.nodes[0]
    if (aFirst === undefined || bFirst === undefined) return 0
    const aKey = keyOf(aFirst)
    const bKey = keyOf(bFirst)
    if (aKey < bKey) return -1
    if (aKey > bKey) return 1
    return 0
  })
  return findings
}
