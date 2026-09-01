import { randomId } from "@akasha/id-minting"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import {
  healBlockMarker,
  isMarkerType,
  markerFor,
  stripLeadingMarker,
} from "../block-markers/block-markers.module.code.ts"
import {
  type Block,
  type RichDocument,
  richDocumentSchema,
} from "../rich-document/rich-document.module.code.ts"
import {
  type BlockPath,
  childrenAtParent,
  findBlockPath,
  getBlockAtPath,
  insertAtPath,
  modifySiblings,
  removeAtPath,
  replaceAtPath,
} from "../rich-document-tree/rich-document-tree.module.code.ts"

export const V1_BLOCK_TYPES = [
  "paragraph",
  "heading",
  "bulleted-list-item",
  "numbered-list-item",
  "to-do",
  "quote",
  "toggle",
  "code",
  "divider",
] as const

export type V1BlockType = (typeof V1_BLOCK_TYPES)[number]

export type HeadingLevel = 1 | 2 | 3

export function newBlockId(): string {
  return randomId()
}

export function createBlock(
  type: V1BlockType,
  opts?: { text?: string; level?: HeadingLevel; id?: string }
): Block {
  const id = opts?.id ?? newBlockId()
  switch (type) {
    case "heading":
      return { id, type, text: opts?.text ?? "", level: opts?.level ?? 1 }
    case "divider":
      return { id, type }
    case "paragraph":
    case "bulleted-list-item":
    case "numbered-list-item":
    case "to-do":
    case "quote":
    case "toggle":
    case "code":
      return { id, type, text: opts?.text ?? "" }
    default:
      return assertNever(type)
  }
}

export function normalizeRichDocument(value: unknown): RichDocument {
  const parsed = richDocumentSchema.safeParse(value)
  if (!parsed.success) return { blocks: [] }
  return { blocks: healBlocks(parsed.data.blocks) }
}

function healBlocks(blocks: readonly Block[]): readonly Block[] {
  let run = 0
  return blocks.map((raw) => {
    const block = withId(raw)
    if (block.type === "numbered-list-item") run += 1
    else run = 0
    const healed = healBlockMarker(block, block.type === "numbered-list-item" ? run : 0)
    const kids = healed.children
    if (kids !== undefined && kids.length > 0) return { ...healed, children: healBlocks(kids) }
    return healed
  })
}

export function withId(block: Block): Block {
  if (block.id !== undefined && block.id !== "") return block
  return { ...block, id: newBlockId() }
}

export type EditorOp =
  | { kind: "insertAfter"; afterId: string | null; block: Block }
  | { kind: "updateText"; id: string; text: string }
  | { kind: "turnInto"; id: string; type: V1BlockType; level?: HeadingLevel }
  | { kind: "deleteBlock"; id: string }
  | { kind: "mergeWithPrevious"; id: string }
  | { kind: "moveBlock"; id: string; direction: "up" | "down" }
  | { kind: "duplicateBlock"; id: string; newId: string }
  | { kind: "indent"; id: string }
  | { kind: "outdent"; id: string }

export function applyEditorOp(doc: RichDocument, op: EditorOp): RichDocument {
  const blocks = doc.blocks.map(withId)
  switch (op.kind) {
    case "insertAfter": {
      if (op.afterId === null) return { blocks: insertAtPath(blocks, [0], withId(op.block)) }
      const path = findBlockPath(blocks, op.afterId)
      if (path === null) return { blocks }
      const idx = lastIndex(path)
      if (idx === undefined) return { blocks }
      return { blocks: insertAtPath(blocks, [...path.slice(0, -1), idx + 1], withId(op.block)) }
    }
    case "updateText": {
      const found = locate(blocks, op.id)
      if (found === null) return { blocks }
      return { blocks: replaceAtPath(blocks, found.path, { ...found.block, text: op.text }) }
    }
    case "turnInto": {
      const found = locate(blocks, op.id)
      if (found === null) return { blocks }
      return {
        blocks: replaceAtPath(blocks, found.path, turnBlockInto(found.block, op.type, op.level)),
      }
    }
    case "deleteBlock": {
      const path = findBlockPath(blocks, op.id)
      if (path === null) return { blocks }
      return { blocks: removeAtPath(blocks, path) }
    }
    case "mergeWithPrevious": {
      const merge = locateMerge(blocks, op.id)
      if (merge === null) return { blocks }
      const afterReplace = replaceAtPath(blocks, merge.prevPath, mergeBlocks(merge.prev, merge.cur))
      return { blocks: removeAtPath(afterReplace, merge.path) }
    }
    case "moveBlock": {
      const found = locate(blocks, op.id)
      if (found === null) return { blocks }
      const idx = lastIndex(found.path)
      if (idx === undefined) return { blocks }
      const parentPath = found.path.slice(0, -1)
      const target = idx + (op.direction === "up" ? -1 : 1)
      if (target < 0 || target >= childrenAtParent(blocks, parentPath).length) return { blocks }
      return {
        blocks: modifySiblings(blocks, parentPath, (siblings) => {
          const next = siblings.slice()
          next.splice(idx, 1)
          next.splice(target, 0, found.block)
          return next
        }),
      }
    }
    case "duplicateBlock": {
      const found = locate(blocks, op.id)
      if (found === null) return { blocks }
      const idx = lastIndex(found.path)
      if (idx === undefined) return { blocks }
      const clone = withoutChildren({ ...found.block, id: op.newId })
      return { blocks: insertAtPath(blocks, [...found.path.slice(0, -1), idx + 1], clone) }
    }
    case "indent": {
      const nest = locateIndent(blocks, op.id)
      if (nest === null) return { blocks }
      const newPrev = { ...nest.prev, children: [...(nest.prev.children ?? []), nest.cur] }
      const afterReplace = replaceAtPath(blocks, nest.prevPath, newPrev)
      return { blocks: removeAtPath(afterReplace, nest.path) }
    }
    case "outdent": {
      const path = findBlockPath(blocks, op.id)
      if (path === null || path.length < 2) return { blocks }
      const cur = getBlockAtPath(blocks, path)
      if (cur === undefined) return { blocks }
      const parentPath = path.slice(0, -1)
      const parentIdx = lastIndex(parentPath)
      if (parentIdx === undefined) return { blocks }
      const afterRemove = removeAtPath(blocks, path)
      return { blocks: insertAtPath(afterRemove, [...parentPath.slice(0, -1), parentIdx + 1], cur) }
    }
    default:
      return assertNever(op)
  }
}

export function lastIndex(path: BlockPath): number | undefined {
  return path[path.length - 1]
}

export function locate(
  blocks: readonly Block[],
  id: string
): { path: BlockPath; block: Block } | null {
  const path = findBlockPath(blocks, id)
  if (path === null) return null
  const block = getBlockAtPath(blocks, path)
  return block === undefined ? null : { path, block }
}

export function locateSiblingPair(
  blocks: readonly Block[],
  id: string
): { path: BlockPath; cur: Block; prevPath: BlockPath; prev: Block } | null {
  const path = findBlockPath(blocks, id)
  if (path === null) return null
  const idx = lastIndex(path)
  if (idx === undefined || idx === 0) return null
  const prevPath = [...path.slice(0, -1), idx - 1]
  const cur = getBlockAtPath(blocks, path)
  const prev = getBlockAtPath(blocks, prevPath)
  if (cur === undefined || prev === undefined) return null
  return { path, cur, prevPath, prev }
}

const locateMerge = locateSiblingPair
const locateIndent = locateSiblingPair

export function textOf(block: Block): string {
  return typeof block.text === "string" ? block.text : ""
}

export function turnBlockInto(block: Block, type: V1BlockType, level?: HeadingLevel): Block {
  const id = block.id ?? newBlockId()
  const content = stripLeadingMarker(textOf(block))
  const text = isMarkerType(type) ? markerFor(type) + content : content
  const turned = createBlock(type, { id, text, level })
  const kids = block.children
  return kids !== undefined && kids.length > 0 ? { ...turned, children: kids } : turned
}

export function mergeBlocks(prev: Block, cur: Block): Block {
  const kids = [...(prev.children ?? []), ...(cur.children ?? [])]
  const merged = { ...prev, text: textOf(prev) + textOf(cur) }
  return kids.length > 0 ? { ...merged, children: kids } : withoutChildren(merged)
}

export function withoutChildren(block: Block): Block {
  const { children, ...rest } = block
  return rest
}
