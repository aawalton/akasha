import type {
  PkgDependsKind,
  WorkspacePackage,
} from "../workspace-packages/workspace-packages.module.code.ts"

type Frame = {
  readonly key: string
  readonly successors: readonly string[]
  next: number
  childKey: string | null
}

export const CYCLE_DEP_KINDS: ReadonlySet<PkgDependsKind> = new Set<PkgDependsKind>([
  "dependencies",
  "devDependencies",
])

export function findNameCycles(
  names: readonly string[],
  successorsOf: (name: string) => readonly string[]
): readonly (readonly string[])[] {
  const known = new Set(names)
  const indexOf = new Map<string, number>()
  const lowlinkOf = new Map<string, number>()
  const onStack = new Set<string>()
  const sccStack: string[] = []
  let nextIndex = 0
  const found: string[][] = []

  const strongconnect = (startKey: string): undefined => {
    const work: Frame[] = []
    const pushFrame = (name: string): undefined => {
      indexOf.set(name, nextIndex)
      lowlinkOf.set(name, nextIndex)
      nextIndex++
      sccStack.push(name)
      onStack.add(name)
      work.push({ key: name, successors: successorsOf(name), next: 0, childKey: null })
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
        const next = top.successors[top.next]
        top.next++
        if (next === undefined) continue
        if (!indexOf.has(next)) {
          if (!known.has(next)) continue
          top.childKey = next
          pushFrame(next)
          continue
        }
        if (onStack.has(next)) {
          const nextIndexOf = indexOf.get(next)
          const ownLow = lowlinkOf.get(top.key)
          if (nextIndexOf !== undefined && ownLow !== undefined && nextIndexOf < ownLow) {
            lowlinkOf.set(top.key, nextIndexOf)
          }
        }
        continue
      }

      work.pop()
      const topIndex = indexOf.get(top.key)
      const topLow = lowlinkOf.get(top.key)
      if (topIndex === undefined || topLow === undefined || topLow !== topIndex) continue
      const scc: string[] = []
      while (sccStack.length > 0) {
        const popped = sccStack.pop()
        if (popped === undefined) break
        onStack.delete(popped)
        scc.push(popped)
        if (popped === top.key) break
      }
      if (scc.length > 1) {
        found.push(scc)
        continue
      }
      const only = scc[0]
      if (only !== undefined && successorsOf(only).includes(only)) found.push(scc)
    }
  }

  for (const name of names) {
    if (indexOf.has(name)) continue
    strongconnect(name)
  }

  const sorted = found.map((scc) => [...scc].sort())
  sorted.sort((one, two) => {
    const here = one[0]
    const there = two[0]
    if (here === undefined || there === undefined) return 0
    return here < there ? -1 : here > there ? 1 : 0
  })
  return sorted
}

export function packageDependencyCycles(
  packages: readonly WorkspacePackage[]
): readonly (readonly string[])[] {
  const names = packages.map((one) => one.name)
  const byName = new Map(packages.map((one) => [one.name, one]))
  const successorsOf = (name: string): readonly string[] => {
    const held = byName.get(name)
    if (held === undefined) return []
    const out: string[] = []
    for (const [depName, kind] of held.dependencies) {
      if (!CYCLE_DEP_KINDS.has(kind)) continue
      out.push(depName)
    }
    return out
  }
  return findNameCycles(names, successorsOf)
}
