import type { TaskProgress } from "@akasha/temper-player-completion-state/completion-task-progress"

export function tallyDone<Entry>(
  entries: Record<number, Entry>,
  isDone: (this: void, entry: Entry) => boolean,
  isCounted?: (this: void, entry: Entry) => boolean
): TaskProgress {
  let current = 0
  let total = 0
  for (const [, entry] of Object.entries(entries)) {
    if (isCounted !== undefined && !isCounted(entry)) continue
    total++
    if (isDone(entry)) current++
  }
  return { current, total }
}

export function tallyPathScopedLeaves<Outer, Middle, Leaf>(
  outers: Record<number, Outer>,
  middlesOf: (this: void, outer: Outer) => Record<number, Middle>,
  leavesOf: (this: void, middle: Middle) => Record<number, Leaf>,
  isDone: (this: void, leaf: Leaf) => boolean,
  itemPath: (string | number)[] | undefined
): TaskProgress | undefined {
  let current = 0
  let total = 0

  const addOuter = (outer: Outer): undefined => {
    for (const [, middle] of Object.entries(middlesOf(outer))) {
      const leaves = tallyDone(leavesOf(middle), isDone)
      current += leaves.current
      total += leaves.total
    }
  }

  if (itemPath === undefined || itemPath.length === 0) {
    for (const [, outer] of Object.entries(outers)) addOuter(outer)
    return { current, total }
  }

  const outer = outers[Number(itemPath[0])]
  if (outer === undefined) return undefined

  if (itemPath.length === 1) {
    addOuter(outer)
    return { current, total }
  }

  const middle = middlesOf(outer)[Number(itemPath[1])]
  if (middle === undefined) return undefined
  return tallyDone(leavesOf(middle), isDone)
}
