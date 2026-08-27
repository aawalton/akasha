import { describe, expect, it, mock } from "bun:test"
import { type RichDocument } from "@shared/pages-core/property-types/rich-document"
import { createBlock, type EditorOp } from "@shared/pages-core/property-types/rich-document-ops"
import { renderHook } from "@shared/utils-test"
import type { FocusCaret } from "../src/block-editor/use-block-keys"
import { useBlockOps } from "../src/block-editor/use-block-ops"

function renderOps(doc: RichDocument) {
  const commit = mock((_op: EditorOp) => {})
  const requestFocus = mock((_id: string, _caret: FocusCaret) => {})
  const focusBlockThroughCommit = mock((_id: string, _caret: FocusCaret) => {})
  const docRef = { current: doc }
  const { result } = renderHook(() =>
    useBlockOps({
      docRef,
      commit,
      flushPendingText: () => {},
      requestFocus,
      focusBlockThroughCommit,
      expand: () => {},
      isCollapsed: () => false,
    })
  )
  return { api: result.current, commit, requestFocus, focusBlockThroughCommit }
}

describe("useBlockOps — delete keyboard retention (#15514)", () => {
  it("refocuses the previous neighbor via focusBlockThroughCommit, not the deferred requestFocus", () => {
    const { api, commit, requestFocus, focusBlockThroughCommit } = renderOps({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
        createBlock("paragraph", { id: "c", text: "gamma" }),
      ],
    })

    api.handleDeleteBlock("b")

    expect(commit).toHaveBeenCalledWith({ kind: "deleteBlock", id: "b" })
    expect(focusBlockThroughCommit).toHaveBeenCalledWith("a", "end")
    expect(requestFocus).not.toHaveBeenCalled()
  })

  it("falls forward to the next neighbor when deleting the first block", () => {
    const { api, focusBlockThroughCommit, requestFocus } = renderOps({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })

    api.handleDeleteBlock("a")

    expect(focusBlockThroughCommit).toHaveBeenCalledWith("b", "end")
    expect(requestFocus).not.toHaveBeenCalled()
  })

  it("deleting the sole block leaves no neighbor to focus", () => {
    const { api, focusBlockThroughCommit, requestFocus } = renderOps({
      blocks: [createBlock("paragraph", { id: "a", text: "alpha" })],
    })

    api.handleDeleteBlock("a")

    expect(focusBlockThroughCommit).not.toHaveBeenCalled()
    expect(requestFocus).not.toHaveBeenCalled()
  })
})
