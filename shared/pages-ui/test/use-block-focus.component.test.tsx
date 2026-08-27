import { afterEach, describe, expect, it } from "bun:test"
import { type RichDocument } from "@shared/pages-core/property-types/rich-document"
import { createBlock } from "@shared/pages-core/property-types/rich-document-ops"
import { act, cleanup, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { useRef } from "react"
import { type BlockFocusApi, useBlockFocus } from "../src/block-editor/use-block-focus"

afterEach(cleanup)

let captured: BlockFocusApi | null = null

function Harness({ doc, ids }: { doc: RichDocument; ids: readonly string[] }) {
  const docRef = useRef(doc)
  docRef.current = doc
  const api = useBlockFocus({ doc, docRef, isCollapsed: () => false })
  captured = api
  return (
    <>
      {ids.map((id) => (
        <textarea key={id} ref={api.setTextareaRef(id)} defaultValue={id} aria-label={id} />
      ))}
    </>
  )
}

const BLOCK_A = createBlock("paragraph", { id: "a", text: "alpha" })
const BLOCK_B = createBlock("paragraph", { id: "b", text: "beta" })
const DOC_AB: RichDocument = { blocks: [BLOCK_A, BLOCK_B] }
const DOC_A: RichDocument = { blocks: [BLOCK_A] }

describe("useBlockFocus — focusBlockThroughCommit guarded re-assert (#15514)", () => {
  it("focuses the target synchronously right now (in-gesture)", () => {
    render(<Harness doc={DOC_AB} ids={["a", "b"]} />)
    act(() => captured?.focusBlockThroughCommit("a", "end"))
    expect(document.activeElement).toBe(screen.getByLabelText("a"))
  })

  it("does NOT re-focus (no flicker) when the focus held across the commit", () => {
    const { rerender } = render(<Harness doc={DOC_AB} ids={["a", "b"]} />)
    const a = screen.getByLabelText("a")
    act(() => captured?.focusBlockThroughCommit("a", "end"))
    expect(document.activeElement).toBe(a)
    act(() => rerender(<Harness doc={DOC_A} ids={["a"]} />))
    expect(document.activeElement).toBe(screen.getByLabelText("a"))
  })

  it("re-focuses the target when focus was lost across the commit (the iOS steal)", () => {
    const { rerender } = render(<Harness doc={DOC_AB} ids={["a", "b"]} />)
    act(() => captured?.focusBlockThroughCommit("a", "end"))
    act(() => {
      const active = document.activeElement
      if (active instanceof HTMLElement) active.blur()
    })
    expect(document.activeElement).toBe(document.body)
    act(() => rerender(<Harness doc={DOC_A} ids={["a"]} />))
    expect(document.activeElement).toBe(screen.getByLabelText("a"))
  })
})
