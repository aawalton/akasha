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
import { toast } from "sonner"
import { createSaveQueue, type SaveQueue } from "./save-queue.ts"

export const SAVE_FAILED_MESSAGE = "This note is not saving"

export const SAVE_FAILED_DESCRIPTION =
  "Your words are on screen but have not been written down. Copy anything you cannot lose."

function announceSaveFailure(): undefined {
  toast.error(SAVE_FAILED_MESSAGE, {
    id: "block-editor-save-failed",
    duration: Number.POSITIVE_INFINITY,
    description: SAVE_FAILED_DESCRIPTION,
  })
  return undefined
}

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
  const queueRef = useRef<SaveQueue | null>(null)
  if (queueRef.current === null) queueRef.current = createSaveQueue(announceSaveFailure)
  const queue = queueRef.current

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
    (prevDoc: RichDocument, op: EditorOp) => queue.enqueue(() => runOne(prevDoc, op)),
    [queue, runOne]
  )
}
