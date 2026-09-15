"use client"

import { patchPage } from "akasha/page/access/modules/patch/patch.module.code.ts"
import type { RichDocument } from "akasha/page/core/property-types/modules/rich-document/rich-document.module.code.ts"
import {
  applyEditorOp,
  type EditorOp,
  normalizeRichDocument,
} from "akasha/page/core/property-types/modules/rich-document-ops/rich-document-ops.module.code.ts"
import type { ReadonlyJSONValue } from "akasha/page/core/schema/modules/pages/pages.module.code.ts"
import {
  createSaveQueue,
  type SaveQueue,
} from "akasha/page/ui/block-editor/modules/save-queue/save-queue.module.code.ts"
import { isJson } from "akasha/utils/narrow/modules/is-json/is-json.module.code.ts"
import type { Json } from "akasha/utils/narrow/modules/json-value/json-value.module.code.ts"
import { useCallback, useRef } from "react"
import { toast } from "sonner"

const SAVE_FAILED_MESSAGE = "This note is not saving"

const SAVE_FAILED_DESCRIPTION =
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
  const queueRef = useRef<SaveQueue | null>(null)
  if (queueRef.current === null) queueRef.current = createSaveQueue(announceSaveFailure)
  const queue = queueRef.current

  const resync = useCallback(async () => {
    await patchPage({
      pageTypeSlug,
      where: [{ key: "id", eq: id }],
      set: { [propertyId]: toJson(currentDocRef.current) },
    })
  }, [pageTypeSlug, id, propertyId, currentDocRef])

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
    [pageTypeSlug, id, propertyId, resync]
  )

  return useCallback(
    (prevDoc: RichDocument, op: EditorOp) => queue.enqueue(() => runOne(prevDoc, op)),
    [queue, runOne]
  )
}
