"use client"

import { patchPage } from "@shared/pages-access/patch"
import { type RichDocument } from "@shared/pages-core/property-types/rich-document"
import {
  applyEditorOp,
  type EditorOp,
  normalizeRichDocument,
} from "@shared/pages-core/property-types/rich-document-ops"
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

interface UseBlockPersistenceArgs {
  pageTypeSlug: string
  id: string
  propertyId: string
  currentDocRef: React.RefObject<RichDocument>
}

export function useBlockPersistence({
  pageTypeSlug,
  id,
  propertyId,
  currentDocRef,
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
      const value = applyEditorOp(normalizeRichDocument(prevDoc), op)
      try {
        await patchPage({
          pageTypeSlug,
          where: [{ key: "id", eq: id }],
          set: { [propertyId]: toJson(value) },
        })
      } catch {
        await resync()
      }
    },
    [client, pageTypeSlug, id, propertyId, resync]
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
