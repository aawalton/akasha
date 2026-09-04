import type { Block } from "../rich-document/rich-document.module.code.ts"

export type BlockPath = readonly number[]

export function findBlockPath(blocks: readonly Block[], id: string): BlockPath | null {
  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i]
    if (block === undefined) continue
    if (block.id === id) return [i]
    const kids = block.children
    if (kids !== undefined) {
      const sub = findBlockPath(kids, id)
      if (sub !== null) return [i, ...sub]
    }
  }
  return null
}

export function getBlockAtPath(blocks: readonly Block[], path: BlockPath): Block | undefined {
  let siblings: readonly Block[] | undefined = blocks
  let block: Block | undefined
  for (const idx of path) {
    if (siblings === undefined) return undefined
    block = siblings[idx]
    if (block === undefined) return undefined
    siblings = block.children
  }
  return block
}

export function findBlock(blocks: readonly Block[], id: string): Block | undefined {
  const path = findBlockPath(blocks, id)
  return path === null ? undefined : getBlockAtPath(blocks, path)
}

export function flattenBlockIds(
  blocks: readonly Block[],
  opts?: { isCollapsed?: (id: string) => boolean }
): readonly string[] {
  const out: string[] = []
  const walk = (arr: readonly Block[]): undefined => {
    for (const block of arr) {
      const id = block.id ?? ""
      out.push(id)
      const kids = block.children
      const collapsed = opts?.isCollapsed?.(id) === true
      if (kids !== undefined && kids.length > 0 && !collapsed) walk(kids)
    }
  }
  walk(blocks)
  return out
}

export function pointerForPath(bodyKey: string, path: BlockPath): string {
  let pointer = `/${bodyKey}/blocks`
  path.forEach((idx, depth) => {
    pointer += depth === 0 ? `/${idx}` : `/children/${idx}`
  })
  return pointer
}

export function siblingsPointer(bodyKey: string, path: BlockPath): string {
  if (path.length <= 1) return `/${bodyKey}/blocks`
  return `${pointerForPath(bodyKey, path.slice(0, -1))}/children`
}

export function childrenAtParent(
  blocks: readonly Block[],
  parentPath: BlockPath
): readonly Block[] {
  if (parentPath.length === 0) return blocks
  const parent = getBlockAtPath(blocks, parentPath)
  return parent?.children ?? []
}

export function modifySiblings(
  blocks: readonly Block[],
  parentPath: BlockPath,
  fn: (siblings: readonly Block[]) => readonly Block[]
): readonly Block[] {
  if (parentPath.length === 0) return fn(blocks)
  const head = parentPath[0]
  if (head === undefined) return blocks
  const parent = blocks[head]
  if (parent === undefined) return blocks
  const newKids = modifySiblings(parent.children ?? [], parentPath.slice(1), fn)
  const next = blocks.slice()
  next[head] = { ...parent, children: newKids }
  return next
}

export function replaceAtPath(
  blocks: readonly Block[],
  path: BlockPath,
  block: Block
): readonly Block[] {
  const idx = path[path.length - 1]
  if (idx === undefined) return blocks
  return modifySiblings(blocks, path.slice(0, -1), (siblings) => {
    const next = siblings.slice()
    next[idx] = block
    return next
  })
}

export function removeAtPath(blocks: readonly Block[], path: BlockPath): readonly Block[] {
  const idx = path[path.length - 1]
  if (idx === undefined) return blocks
  return modifySiblings(blocks, path.slice(0, -1), (siblings) => {
    const next = siblings.slice()
    next.splice(idx, 1)
    return next
  })
}

export function insertAtPath(
  blocks: readonly Block[],
  path: BlockPath,
  block: Block
): readonly Block[] {
  const idx = path[path.length - 1]
  if (idx === undefined) return blocks
  return modifySiblings(blocks, path.slice(0, -1), (siblings) => {
    const next = siblings.slice()
    next.splice(idx, 0, block)
    return next
  })
}
