import { describe, expect, mock, test } from "bun:test"
import type { RichDocument } from "@shared/pages-core/property-types/rich-document"
import type { EditorOp } from "@shared/pages-core/property-types/rich-document-ops"
import { renderHook } from "@shared/utils-test"

const REFUSAL = new Error(
  "patchPage(note): the write of `note-1` did not land — the page write service could not be reached"
)

let refuseWrites = false
let writeCount = 0
const errorToasts: string[] = []

mock.module("@shared/supabase-rr/provider", () => ({
  useSupabase: () => ({}),
}))

mock.module("sonner", () => ({
  toast: {
    error: (message: string) => {
      errorToasts.push(message)
      return "toast-id"
    },
  },
}))

mock.module("@shared/pages-access/patch", () => ({
  patchPage: async () => {
    if (refuseWrites) throw REFUSAL
    writeCount += 1
    return null
  },
}))

const { SAVE_FAILED_MESSAGE, useBlockPersistence } = await import("./use-block-persistence.ts")

const DOC: RichDocument = { blocks: [{ id: "a", type: "paragraph", text: "one" }] }

const OP: EditorOp = { kind: "updateText", id: "a", text: "two" }

function settle(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 20))
}

function enqueueFor(): (prevDoc: RichDocument, op: EditorOp) => Promise<void> {
  const currentDocRef = { current: DOC }
  const { result } = renderHook(() =>
    useBlockPersistence({ pageTypeSlug: "note", id: "note-1", propertyId: "body", currentDocRef })
  )
  return result.current
}

describe("useBlockPersistence — never let a failed write return like a done one", () => {
  test("a write that does not land rejects the caller and tells the user", async () => {
    errorToasts.length = 0
    refuseWrites = true
    const enqueue = enqueueFor()
    await expect(enqueue(DOC, OP)).rejects.toBe(REFUSAL)
    expect(errorToasts).toEqual([SAVE_FAILED_MESSAGE])
  })

  test("a write that lands resolves the caller and says nothing", async () => {
    errorToasts.length = 0
    refuseWrites = false
    const enqueue = enqueueFor()
    await enqueue(DOC, OP)
    expect(errorToasts).toEqual([])
  })

  test("only the write that does not land reaches the unhandledrejection route", async () => {
    const seen: unknown[] = []
    const listener = (reason: unknown): undefined => {
      seen.push(reason)
      return undefined
    }
    process.on("unhandledRejection", listener)
    try {
      refuseWrites = true
      void enqueueFor()(DOC, OP)
      await settle()
      expect(seen).toContain(REFUSAL)

      seen.length = 0
      refuseWrites = false
      void enqueueFor()(DOC, OP)
      await settle()
      expect(seen).toEqual([])
    } finally {
      process.off("unhandledRejection", listener)
    }
  })

  test("a write that does not land leaves the edits behind it still writing", async () => {
    errorToasts.length = 0
    refuseWrites = true
    const enqueue = enqueueFor()
    await expect(enqueue(DOC, OP)).rejects.toBe(REFUSAL)
    refuseWrites = false
    const before = writeCount
    await enqueue(DOC, OP)
    expect(writeCount).toBe(before + 1)
  })
})
