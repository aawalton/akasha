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
  return screen.queryAllByRole<HTMLTextAreaElement>("textbox")
}

describe("BlockEditor — empty-state renders genuinely blank (#15044)", () => {
  it("shows NO ghost placeholder text on an empty document", () => {
    renderEditor({ blocks: [] })
    expect(screen.queryByText("Type '/' for commands")).toBeNull()
    const button = screen.getByRole("button", { name: "Empty note — click to start typing" })
    expect(button.textContent).toBe("")
  })

  it("clicking the blank empty-state materializes a real paragraph block", () => {
    renderEditor({ blocks: [] })
    expect(textboxes()).toHaveLength(0)
    fireEvent.click(screen.getByRole("button", { name: "Empty note — click to start typing" }))
    expect(textboxes()).toHaveLength(1)
  })
})

describe("BlockEditor — last blank block is removable (#15044)", () => {
  it("Backspace at the start of the sole blank paragraph empties the document", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { key: "Backspace" })
    expect(textboxes()).toHaveLength(0)
    expect(screen.getByRole("button", { name: "Empty note — click to start typing" })).toBeDefined()
  })

  it("does NOT remove the sole block when it still has content", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "keep" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { key: "Backspace" })
    expect(textboxes().map((t) => t.value)).toEqual(["keep"])
  })

  it("does NOT remove a blank first block while other blocks remain", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "" }),
        createBlock("paragraph", { id: "b", text: "second" }),
      ],
    })
    const [first] = textboxes()
    if (first === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(first, { key: "Backspace" })
    expect(textboxes().map((t) => t.value)).toEqual(["", "second"])
  })
})
