import { afterEach, describe, expect, it, mock } from "bun:test"
import { type RichDocument } from "@shared/pages-core/property-types/rich-document"
import { createBlock } from "@shared/pages-core/property-types/rich-document-ops"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"

mock.module("../src/block-editor/use-block-persistence", () => ({
  useBlockPersistence: () => () => Promise.resolve(),
}))

const { BlockEditor } = await import("../src/block-editor/block-editor")

afterEach(() => {
  cleanup()
})

function renderEditor(doc: RichDocument) {
  render(<BlockEditor pageTypeSlug="note" id="row-1" propertyId="body" value={doc} />)
}

function textboxes(): readonly HTMLTextAreaElement[] {
  return screen.getAllByRole<HTMLTextAreaElement>("textbox")
}

function selectedTexts(): readonly string[] {
  return Array.from(
    document.querySelectorAll<HTMLTextAreaElement>('[data-selected="true"] textarea')
  ).map((t) => t.value)
}

describe("BlockEditor — block selection mode", () => {
  it("Esc selects the current block (highlights it)", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "alpha" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { key: "Escape" })
    expect(selectedTexts()).toEqual(["alpha"])
  })

  it("Backspace deletes the selected block", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const [first] = textboxes()
    if (first === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(first, { key: "Escape" })
    fireEvent.keyDown(document, { key: "Backspace" })
    expect(textboxes().map((t) => t.value)).toEqual(["beta"])
  })

  it("Delete also deletes the selected block", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const tas = textboxes()
    const second = tas[1]
    if (second === undefined) throw new Error("expected two textareas")
    fireEvent.keyDown(second, { key: "Escape" })
    fireEvent.keyDown(document, { key: "Delete" })
    expect(textboxes().map((t) => t.value)).toEqual(["alpha"])
  })

  it("Shift+ArrowDown extends the selection, then Backspace deletes both blocks", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
        createBlock("paragraph", { id: "c", text: "gamma" }),
      ],
    })
    const [first] = textboxes()
    if (first === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(first, { key: "Escape" })
    fireEvent.keyDown(document, { key: "ArrowDown", shiftKey: true })
    expect(selectedTexts()).toEqual(["alpha", "beta"])
    fireEvent.keyDown(document, { key: "Backspace" })
    expect(textboxes().map((t) => t.value)).toEqual(["gamma"])
  })

  it("Escape in selection mode clears the selection (back to caret mode)", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "alpha" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { key: "Escape" })
    expect(selectedTexts()).toEqual(["alpha"])
    fireEvent.keyDown(document, { key: "Escape" })
    expect(selectedTexts()).toEqual([])
  })

  it("focusing a block's textarea exits selection mode", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "alpha" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { key: "Escape" })
    expect(selectedTexts()).toEqual(["alpha"])
    fireEvent.focus(ta)
    expect(selectedTexts()).toEqual([])
  })
})
