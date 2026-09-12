export interface AddonDepInput {
  readonly addonName: string
  readonly deps: readonly string[]
}

export interface DependencyCycleViolation {
  readonly message: string
  readonly cycle: readonly string[]
}

export function stripVersionSuffix(dep: string): string {
  const idx = dep.search(/[<>=]/)
  const base = idx === -1 ? dep : dep.slice(0, idx)
  return base.trim()
}

function canonicalizeCycle(path: readonly string[]): readonly string[] {
  let minIdx = 0
  for (let i = 1; i < path.length; i++) {
    const cur = path[i]
    const min = path[minIdx]
    if (cur !== undefined && min !== undefined && cur < min) minIdx = i
  }
  return [...path.slice(minIdx), ...path.slice(0, minIdx)]
}

export function findDependencyCycles(
  inputs: readonly AddonDepInput[]
): readonly DependencyCycleViolation[] {
  const adjacency = new Map<string, readonly string[]>()
  for (const input of inputs) {
    const edges = input.deps.map(stripVersionSuffix).filter((d) => d.length > 0)
    adjacency.set(input.addonName, edges)
  }

  const found = new Map<string, readonly string[]>()
  const visited = new Set<string>()

  const explore = (root: string): undefined => {
    const stack: { node: string; edgeIdx: number }[] = [{ node: root, edgeIdx: 0 }]
    const onStack = new Set<string>([root])
    const path: string[] = [root]

    while (stack.length > 0) {
      const frame = stack[stack.length - 1]
      if (frame === undefined) break
      const neighbors = adjacency.get(frame.node) ?? []
      if (frame.edgeIdx >= neighbors.length) {
        onStack.delete(frame.node)
        path.pop()
        stack.pop()
        visited.add(frame.node)
        continue
      }
      const next = neighbors[frame.edgeIdx]
      frame.edgeIdx++
      if (next === undefined) continue

      if (onStack.has(next)) {
        const startIdx = path.indexOf(next)
        const cyclePath = canonicalizeCycle(path.slice(startIdx))
        found.set(cyclePath.join("\u0000"), cyclePath)
        continue
      }
      if (visited.has(next) || !adjacency.has(next)) continue

      stack.push({ node: next, edgeIdx: 0 })
      onStack.add(next)
      path.push(next)
    }
  }

  for (const input of inputs) {
    if (!visited.has(input.addonName)) explore(input.addonName)
  }

  const violations: DependencyCycleViolation[] = [...found.values()].map((cycle) => {
    const rendered =
      cycle.length === 1 ? `${cycle[0]} → ${cycle[0]}` : `${cycle.join(" → ")} → ${cycle[0]}`
    return {
      cycle,
      message: `circular addon dependency: ${rendered} — ESO's loader rejects cyclic DependsOn/OptionalDependsOn edges at game load; break the cycle by removing one edge`,
    }
  })

  violations.sort((a, b) => a.cycle.join("\u0000").localeCompare(b.cycle.join("\u0000")))
  return violations
}
