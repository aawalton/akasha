"use client"

import { patchPage } from "@shared/pages-access/patch"
import { type JsonPatch } from "@shared/pages-access/types"
import { type RichDocument } from "@shared/pages-core/property-types/rich-document"
import { type EditorOp } from "@shared/pages-core/property-types/rich-document-ops"
import { editorOpToPatch, type JsonPatchLike } from "@shared/pages-core/property-types/rich-document-persist"
import { type ReadonlyJSONValue } from "@shared/pages-core/schema/pages"
import type { Json } from "../../../supabase-database/src/generated/database.ts"
import { useSupabase } from "@shared/supabase-rr/provider"
import { isJson } from "../../../utils-narrow/src/is-json.ts"
import { useCallback, useRef } from "react"

function toJson(value: RichDocument | ReadonlyJSONValue): Json {
  if (!isJson(value)) {
    throw new Error("BlockEditor: rich-document value is not JSON-shaped")
  }
  return value
}

function toJsonPatch(patch: JsonPatchLike): JsonPatch {
  const ops: JsonPatch = patch.map((op) =>
    op.op === "remove"
      ? { op: "remove", path: op.path }
      : { op: op.op, path: op.path, value: toJson(op.value) }
  )
  return ops
}

interface UseBlockPersistenceArgs {
  pageTypeSlug: string
  id: string
  propertyId: string
  currentDocRef: React.RefObject<RichDocument>
  contentTier: boolean
}

export function useBlockPersistence({
  pageTypeSlug,
  id,
  propertyId,
  currentDocRef,
  contentTier,
}: UseBlockPersistenceArgs): (prevDoc: RichDocument, op: EditorOp) => Promise<void> {
  const client = useSupabase()
  const chainRef = useRef<Promise<void>>(Promise.resolve())

  const resync = useCallback(async () => {
    await patchPage({
      pageTypeSlug,
      where: [{ key: "id", eq: id }],
      set: { [propertyId]: toJson(currentDocRef.current) },
    })
  }, [client, pageTypeSlug, id, propertyId, currentDocRef])

  const runOne = useCallback(
    async (prevDoc: RichDocument, op: EditorOp) => {
      const instruction = editorOpToPatch(prevDoc, op, propertyId, { wholeBody: contentTier })
      try {
        switch (instruction.kind) {
          case "init":
            await patchPage({
              pageTypeSlug,
              where: [{ key: "id", eq: id }],
              set: { [propertyId]: toJson(instruction.value) },
            })
            return
          case "patch": {
            if (instruction.patch.length === 0) return
            const patch = toJsonPatch(instruction.patch)
            await patchPage({
              pageTypeSlug,
              where: [{ key: "id", eq: id }],
              set: {},
              patch,
            })
            return
          }
          default: {
            const _exhaustive: never = instruction
            return _exhaustive
          }
        }
      } catch {
        await resync()
      }
    },
    [client, pageTypeSlug, id, propertyId, resync, contentTier]
  )

  return useCallback(
    (prevDoc: RichDocument, op: EditorOp) => {
      const next = chainRef.current.then(() => runOne(prevDoc, op))
      chainRef.current = next.catch(() => undefined)
      return next
    },
    [runOne]
  )
}
