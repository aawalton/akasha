import type {
  AbsorbedWorkflow,
  WorkflowConfig,
} from "../workflow-config/workflow-config.module.code.ts"

export function topologicallySortWorkflows(
  workflows: readonly WorkflowConfig[]
): readonly WorkflowConfig[] {
  const selectedNames = new Set(workflows.map((wf) => wf.name))

  const originalIndex = new Map<string, number>()
  workflows.forEach((wf, i) => originalIndex.set(wf.name, i))

  const inDegree = new Map<string, number>()
  const edgesFrom = new Map<string, string[]>()
  for (const wf of workflows) {
    inDegree.set(wf.name, 0)
  }
  for (const wf of workflows) {
    for (const dep of wf.dependsOn ?? []) {
      if (!selectedNames.has(dep)) continue
      inDegree.set(wf.name, (inDegree.get(wf.name) ?? 0) + 1)
      const list = edgesFrom.get(dep) ?? []
      list.push(wf.name)
      edgesFrom.set(dep, list)
    }
  }

  const byName = new Map(workflows.map((wf) => [wf.name, wf]))
  const ready: string[] = []
  for (const wf of workflows) {
    if ((inDegree.get(wf.name) ?? 0) === 0) ready.push(wf.name)
  }
  ready.sort((a, b) => (originalIndex.get(a) ?? 0) - (originalIndex.get(b) ?? 0))

  const result: WorkflowConfig[] = []
  while (ready.length > 0) {
    const name = ready.shift()
    if (name === undefined) continue
    const wf = byName.get(name)
    if (wf) result.push(wf)
    const downstreams = edgesFrom.get(name) ?? []
    const newlyReady: string[] = []
    for (const down of downstreams) {
      const next = (inDegree.get(down) ?? 0) - 1
      inDegree.set(down, next)
      if (next === 0) newlyReady.push(down)
    }
    newlyReady.sort((a, b) => (originalIndex.get(a) ?? 0) - (originalIndex.get(b) ?? 0))
    for (const n of newlyReady) {
      const insertIdx = ready.findIndex(
        (existing) => (originalIndex.get(existing) ?? 0) > (originalIndex.get(n) ?? 0)
      )
      if (insertIdx === -1) ready.push(n)
      else ready.splice(insertIdx, 0, n)
    }
  }

  if (result.length !== workflows.length) {
    const remaining = workflows.filter((wf) => !result.includes(wf)).map((wf) => wf.name)
    const path = findCyclePath(remaining, workflows)
    const chain =
      path !== undefined
        ? `${path.join(" -> ")} (members: ${remaining.join(", ")})`
        : remaining.join(", ")
    throw new Error(`cycle in selected workflow dependsOn: ${chain}`)
  }

  return result
}

function findCyclePath(
  remaining: readonly string[],
  workflows: readonly WorkflowConfig[]
): readonly string[] | undefined {
  const remainingSet = new Set(remaining)
  const edges = new Map<string, string[]>()
  for (const wf of workflows) {
    if (!remainingSet.has(wf.name)) continue
    const out: string[] = []
    for (const t of wf.dependsOn ?? []) {
      if (remainingSet.has(t)) out.push(t)
    }
    edges.set(wf.name, out)
  }
  const visited = new Set<string>()
  const onStack = new Set<string>()
  const stack: string[] = []
  function dfs(node: string): readonly string[] | undefined {
    if (onStack.has(node)) {
      const start = stack.indexOf(node)
      return [...stack.slice(start), node]
    }
    if (visited.has(node)) return undefined
    visited.add(node)
    onStack.add(node)
    stack.push(node)
    for (const next of edges.get(node) ?? []) {
      const found = dfs(next)
      if (found !== undefined) return found
    }
    stack.pop()
    onStack.delete(node)
    return undefined
  }
  for (const node of remaining) {
    const found = dfs(node)
    if (found !== undefined) return found
  }
  return undefined
}

function asStringArray(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) return undefined
  const out: string[] = []
  for (const v of value) {
    if (typeof v !== "string") return undefined
    out.push(v)
  }
  return out
}

export function isMergedGraphAcyclic(
  selected: readonly WorkflowConfig[],
  absorbed: readonly AbsorbedWorkflow[]
): boolean {
  type Edges = { dependsOn?: readonly string[] }
  const byName = new Map<string, Edges>()
  for (const wf of selected) {
    byName.set(wf.name, { dependsOn: wf.dependsOn })
  }
  for (const a of absorbed) {
    byName.set(a.workflow.name, {
      dependsOn: asStringArray(a.config.dependsOn),
    })
  }
  const inDegree = new Map<string, number>()
  const edgesFrom = new Map<string, string[]>()
  for (const name of byName.keys()) inDegree.set(name, 0)
  for (const [name, e] of byName) {
    for (const t of e.dependsOn ?? []) {
      if (!byName.has(t)) continue
      inDegree.set(name, (inDegree.get(name) ?? 0) + 1)
      const list = edgesFrom.get(t) ?? []
      list.push(name)
      edgesFrom.set(t, list)
    }
  }
  const ready: string[] = []
  for (const name of byName.keys()) {
    if ((inDegree.get(name) ?? 0) === 0) ready.push(name)
  }
  let processed = 0
  while (ready.length > 0) {
    const n = ready.shift()
    if (n === undefined) continue
    processed++
    for (const d of edgesFrom.get(n) ?? []) {
      const next = (inDegree.get(d) ?? 0) - 1
      inDegree.set(d, next)
      if (next === 0) ready.push(d)
    }
  }
  return processed === byName.size
}
