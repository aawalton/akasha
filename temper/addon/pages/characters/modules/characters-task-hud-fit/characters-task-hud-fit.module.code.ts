export interface TaskBlock {
  readonly height: number
  readonly foldedHeight: number
  readonly foldable: boolean
}

export interface TaskFit {
  readonly folded: readonly boolean[]
  readonly shown: number
}

export function fitTaskBlocks(
  blocks: readonly TaskBlock[],
  room: number,
  moreRowHeight: number
): TaskFit {
  const folded = blocks.map(() => false)
  const heightOf = (index: number): number => {
    const block = blocks[index]
    if (block === undefined) return 0
    return folded[index] === true ? block.foldedHeight : block.height
  }

  let total = 0
  for (let index = 0; index < blocks.length; index++) total += heightOf(index)

  for (let index = blocks.length - 1; index >= 0 && total > room; index--) {
    const block = blocks[index]
    if (block === undefined || !block.foldable) continue
    total -= block.height - block.foldedHeight
    folded[index] = true
  }
  if (total <= room) return { folded, shown: blocks.length }

  let shown = blocks.length
  while (shown > 0 && total + moreRowHeight > room) {
    shown -= 1
    total -= heightOf(shown)
  }
  return { folded, shown }
}
