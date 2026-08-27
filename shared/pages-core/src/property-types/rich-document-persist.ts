import { assertNever } from "../../../utils-narrow/src/assert-never"
import { isJson } from "../../../utils-narrow/src/is-json"
import { isRecord } from "../../../utils-narrow/src/is-record"
import type { ReadonlyJSONValue } from "../schema/pages"
import type { Block, RichDocument } from "./rich-document"
import {
  applyEditorOp,
  type EditorOp,
  lastIndex,
  locate,
  locateSiblingPair,
  mergeBlocks,
  normalizeRichDocument,
  textOf,
  turnBlockInto,
  withId,
  withoutChildren,
} from "./rich-document-ops"
import {
  childrenAtParent,
  findBlockPath,
  getBlockAtPath,
  pointerForPath,
} from "./rich-document-tree"

export type JsonPatchOpLike =
  | { op: "add"; path: string; value: ReadonlyJSONValue }
  | { op: "remove"; path: string }
  | { op: "replace"; path: string; value: ReadonlyJSONValue }

export type JsonPatchLike = readonly JsonPatchOpLike[]

export type PersistInstruction =
  | { kind: "init"; bodyKey: string; value: RichDocument }
  | { kind: "patch"; patch: JsonPatchLike }

export function editorOpToPatch(
  prevDoc: unknown,
  op: EditorOp,
  bodyKey: string,
  opts?: { wholeBody?: boolean }
): PersistInstruction {
  if (opts?.wholeBody === true || !isInitializedDoc(prevDoc)) {
    return {
      kind: "init",
      bodyKey,
      value: applyEditorOp(normalizeRichDocument(prevDoc), op),
    }
  }

  const blocks = prevDoc.blocks
  const empty: PersistInstruction = { kind: "patch", patch: [] }

  switch (op.kind) {
    case "insertAfter": {
      if (op.afterId === null) {
        if (blocks.length === 0) {
          return {
            kind: "init",
            bodyKey,
            value: applyEditorOp(normalizeRichDocument(prevDoc), op),
          }
        }
        const value = toJSONValue(withId(op.block))
        return { kind: "patch", patch: [{ op: "add", path: pointerForPath(bodyKey, [0]), value }] }
      }
      const path = findBlockPath(blocks, op.afterId)
      if (path === null) return empty
      const idx = lastIndex(path)
      if (idx === undefined) return empty
      const value = toJSONValue(withId(op.block))
      const at = pointerForPath(bodyKey, [...path.slice(0, -1), idx + 1])
      return { kind: "patch", patch: [{ op: "add", path: at, value }] }
    }
    case "updateText": {
      const path = findBlockPath(blocks, op.id)
      if (path === null) return empty
      return {
        kind: "patch",
        patch: [{ op: "replace", path: `${pointerForPath(bodyKey, path)}/text`, value: op.text }],
      }
    }
    case "turnInto": {
      const found = locate(blocks, op.id)
      if (found === null) return empty
      const value = toJSONValue(turnBlockInto(found.block, op.type, op.level))
      return {
        kind: "patch",
        patch: [{ op: "replace", path: pointerForPath(bodyKey, found.path), value }],
      }
    }
    case "deleteBlock": {
      const path = findBlockPath(blocks, op.id)
      if (path === null) return empty
      return { kind: "patch", patch: [{ op: "remove", path: pointerForPath(bodyKey, path) }] }
    }
    case "mergeWithPrevious": {
      const merge = locateSiblingPair(blocks, op.id)
      if (merge === null) return empty
      const curPointer = pointerForPath(bodyKey, merge.path)
      const prevPointer = pointerForPath(bodyKey, merge.prevPath)
      const merged = mergeBlocks(merge.prev, merge.cur)
      if (merged.children === undefined) {
        return {
          kind: "patch",
          patch: [
            { op: "replace", path: `${prevPointer}/text`, value: textOf(merged) },
            { op: "remove", path: curPointer },
          ],
        }
      }
      return {
        kind: "patch",
        patch: [
          { op: "replace", path: prevPointer, value: toJSONValue(merged) },
          { op: "remove", path: curPointer },
        ],
      }
    }
    case "moveBlock": {
      const found = locate(blocks, op.id)
      if (found === null) return empty
      const idx = lastIndex(found.path)
      if (idx === undefined) return empty
      const parentPath = found.path.slice(0, -1)
      const target = idx + (op.direction === "up" ? -1 : 1)
      if (target < 0 || target >= childrenAtParent(blocks, parentPath).length) return empty
      const value = toJSONValue(found.block)
      return {
        kind: "patch",
        patch: [
          { op: "remove", path: pointerForPath(bodyKey, found.path) },
          { op: "add", path: pointerForPath(bodyKey, [...parentPath, target]), value },
        ],
      }
    }
    case "duplicateBlock": {
      const found = locate(blocks, op.id)
      if (found === null) return empty
      const idx = lastIndex(found.path)
      if (idx === undefined) return empty
      const value = toJSONValue(withoutChildren({ ...found.block, id: op.newId }))
      const at = pointerForPath(bodyKey, [...found.path.slice(0, -1), idx + 1])
      return { kind: "patch", patch: [{ op: "add", path: at, value }] }
    }
    case "indent": {
      const nest = locateSiblingPair(blocks, op.id)
      if (nest === null) return empty
      const removeOp = { op: "remove", path: pointerForPath(bodyKey, nest.path) } as const
      const prevChildren = nest.prev.children ?? []
      const prevPointer = pointerForPath(bodyKey, nest.prevPath)
      const value = toJSONValue(nest.cur)
      const addOp =
        prevChildren.length === 0
          ? { op: "add" as const, path: `${prevPointer}/children`, value: [value] }
          : { op: "add" as const, path: `${prevPointer}/children/${prevChildren.length}`, value }
      return { kind: "patch", patch: [removeOp, addOp] }
    }
    case "outdent": {
      const path = findBlockPath(blocks, op.id)
      if (path === null || path.length < 2) return empty
      const cur = getBlockAtPath(blocks, path)
      if (cur === undefined) return empty
      const parentPath = path.slice(0, -1)
      const parentIdx = lastIndex(parentPath)
      if (parentIdx === undefined) return empty
      const value = toJSONValue(cur)
      const at = pointerForPath(bodyKey, [...parentPath.slice(0, -1), parentIdx + 1])
      return {
        kind: "patch",
        patch: [
          { op: "remove", path: pointerForPath(bodyKey, path) },
          { op: "add", path: at, value },
        ],
      }
    }
    default:
      return assertNever(op)
  }
}

function isInitializedDoc(doc: unknown): doc is RichDocument {
  return isRecord(doc) && Array.isArray(doc.blocks)
}

function toJSONValue(block: Block): ReadonlyJSONValue {
  if (!isJson(block)) throw new Error("rich-document block is not JSON-shaped")
  return block
}
