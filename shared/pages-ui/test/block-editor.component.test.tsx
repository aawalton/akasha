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

describe("BlockEditor — block-op keyboard shortcuts", () => {
  it("cmd+opt+1 turns the focused paragraph into a Heading 1", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "hello" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { metaKey: true, altKey: true, code: "Digit1" })
    expect(screen.getByLabelText("Heading")).toBeDefined()
  })

  it("ctrl+shift+5 turns the focused paragraph into a bulleted list item", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "hello" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { ctrlKey: true, shiftKey: true, code: "Digit5" })
    expect(screen.getByLabelText("List")).toBeDefined()
  })

  it("cmd+shift+ArrowUp moves the focused block above its predecessor", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const tas = textboxes()
    const second = tas[1]
    if (second === undefined) throw new Error("expected two textareas")
    fireEvent.keyDown(second, { metaKey: true, shiftKey: true, key: "ArrowUp" })
    expect(textboxes().map((t) => t.value)).toEqual(["beta", "alpha"])
  })

  it("cmd+shift+ArrowDown moves the focused block below its successor", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const [first] = textboxes()
    if (first === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(first, { metaKey: true, shiftKey: true, key: "ArrowDown" })
    expect(textboxes().map((t) => t.value)).toEqual(["beta", "alpha"])
  })

  it("cmd+D duplicates the focused block after itself", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "dup" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { metaKey: true, code: "KeyD" })
    expect(textboxes().map((t) => t.value)).toEqual(["dup", "dup"])
  })

  it("a plain digit keystroke does not transform the block", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.keyDown(ta, { code: "Digit1" })
    expect(screen.queryByLabelText("Heading")).toBeNull()
  })
})

describe("BlockEditor — arrow keys move the caret across blocks (#14762 child project 4)", () => {
  it("ArrowUp on the first line focuses the previous block", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const [first, second] = textboxes()
    if (first === undefined || second === undefined) throw new Error("expected two textareas")
    second.focus()
    second.setSelectionRange(0, 0)
    fireEvent.keyDown(second, { key: "ArrowUp" })
    expect(document.activeElement).toBe(first)
  })

  it("ArrowDown on the last line focuses the next block", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const [first, second] = textboxes()
    if (first === undefined || second === undefined) throw new Error("expected two textareas")
    first.focus()
    first.setSelectionRange(first.value.length, first.value.length)
    fireEvent.keyDown(first, { key: "ArrowDown" })
    expect(document.activeElement).toBe(second)
  })
})

function stubMatchMedia(coarse: boolean): () => void {
  const original = window.matchMedia
  const stub = (query: string): MediaQueryList => ({
    matches: coarse && query.includes("coarse"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })
  window.matchMedia = stub
  return () => {
    window.matchMedia = original
  }
}

describe("BlockEditor — mobile accessory bar (#15050)", () => {
  it("appears on a coarse-pointer device once a block textarea is focused", () => {
    const restore = stubMatchMedia(true)
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "alpha" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    expect(screen.queryByRole("toolbar", { name: "Block actions" })).toBeNull()
    fireEvent.focus(ta)
    expect(screen.getByRole("toolbar", { name: "Block actions" })).toBeDefined()
    restore()
  })

  it("stays absent on a fine-pointer device even with a block focused", () => {
    const restore = stubMatchMedia(false)
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "alpha" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireEvent.focus(ta)
    expect(screen.queryByRole("toolbar", { name: "Block actions" })).toBeNull()
    restore()
  })

  it("the bar's Delete removes the focused block and refocuses its previous neighbor", () => {
    const restore = stubMatchMedia(true)
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
        createBlock("paragraph", { id: "c", text: "gamma" }),
      ],
    })
    const second = textboxes()[1]
    if (second === undefined) throw new Error("expected three textareas")
    fireEvent.focus(second)
    fireEvent.pointerDown(screen.getByRole("button", { name: "Delete block" }))
    expect(textboxes().map((t) => t.value)).toEqual(["alpha", "gamma"])
    expect(document.activeElement).toBe(textboxes()[0])
    restore()
  })

  it("the bar's Move down reorders the focused block past its successor", () => {
    const restore = stubMatchMedia(true)
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const [first] = textboxes()
    if (first === undefined) throw new Error("expected two textareas")
    fireEvent.focus(first)
    fireEvent.pointerDown(screen.getByRole("button", { name: "Move down" }))
    expect(textboxes().map((t) => t.value)).toEqual(["beta", "alpha"])
    restore()
  })
})

describe("BlockEditor — tap open space focuses the last block (#15515)", () => {
  it("pointerDown on the below-blocks filler places the caret at the END of the last block", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const filler = screen.getByRole("button", { name: "Focus end of notes" })
    fireEvent.pointerDown(filler)
    const active = document.activeElement
    expect(active).toBe(textboxes()[1])
    if (!(active instanceof HTMLTextAreaElement)) throw new Error("expected a textarea focused")
    expect(active.value).toBe("beta")
    expect(active.selectionStart).toBe("beta".length)
  })

  it("focuses the last VISIBLE block even when a single block is present", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "hello" })] })
    const filler = screen.getByRole("button", { name: "Focus end of notes" })
    fireEvent.pointerDown(filler)
    const active = document.activeElement
    expect(active).toBe(textboxes()[0])
    if (!(active instanceof HTMLTextAreaElement)) throw new Error("expected a textarea focused")
    expect(active.selectionStart).toBe("hello".length)
  })

  it("a tap on an existing block's textarea is not intercepted by the filler", () => {
    renderEditor({
      blocks: [
        createBlock("paragraph", { id: "a", text: "alpha" }),
        createBlock("paragraph", { id: "b", text: "beta" }),
      ],
    })
    const [first] = textboxes()
    if (first === undefined) throw new Error("expected a textarea")
    fireEvent.pointerDown(first)
    first.focus()
    expect(document.activeElement).toBe(first)
  })

  it("empty note: tapping the full-card hit target materializes and focuses the first block", () => {
    renderEditor({ blocks: [] })
    const empty = screen.getByRole("button", { name: "Empty note — click to start typing" })
    fireEvent.click(empty)
    const active = document.activeElement
    expect(active instanceof HTMLTextAreaElement).toBe(true)
  })
})

describe("BlockEditor — toggle blocks default collapsed (#14762 child project 1)", () => {
  const toggleWithChild = (): RichDocument => ({
    blocks: [
      {
        id: "t",
        type: "toggle",
        text: "Section",
        children: [{ id: "c", type: "paragraph", text: "kid" }],
      },
    ],
  })

  it("renders a toggle collapsed on mount, healing its '> ' marker — child hidden", () => {
    renderEditor(toggleWithChild())
    const toggle = screen.getByLabelText<HTMLTextAreaElement>("Toggle")
    expect(toggle.value).toBe("> Section")
    expect(textboxes().map((t) => t.value)).toEqual(["> Section"])
  })

  it("clicking the toggle's '> ' marker expands it and reveals its child", () => {
    renderEditor(toggleWithChild())
    const toggle = screen.getByLabelText<HTMLTextAreaElement>("Toggle")
    toggle.setSelectionRange(0, 0)
    fireEvent.click(toggle)
    expect(textboxes().map((t) => t.value)).toEqual(["> Section", "kid"])
  })
})

describe("BlockEditor — plain-text-forward model (#14816)", () => {
  function fireBeforeInput(ta: HTMLTextAreaElement, inputType: string, data: string | null) {
    ta.focus()
    ta.setSelectionRange(ta.value.length, ta.value.length)
    fireEvent(
      ta,
      new InputEvent("beforeinput", { inputType, data, cancelable: true, bubbles: true })
    )
  }

  it("typing '- ' turns a paragraph into a bullet whose literal '- ' stays in the text", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "-" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireBeforeInput(ta, "insertText", " ")
    const list = screen.getByLabelText<HTMLTextAreaElement>("List")
    expect(list.value).toBe("- ")
  })

  it("typing '> ' turns a paragraph into a toggle whose literal '> ' stays (zero-shift, #15038)", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: ">" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireBeforeInput(ta, "insertText", " ")
    const toggle = screen.getByLabelText<HTMLTextAreaElement>("Toggle")
    expect(toggle.value).toBe("> ")
  })

  it("typing '# ' turns a paragraph into a heading whose literal '# ' stays (#15038)", () => {
    renderEditor({ blocks: [createBlock("paragraph", { id: "a", text: "#" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireBeforeInput(ta, "insertText", " ")
    const heading = screen.getByLabelText<HTMLTextAreaElement>("Heading")
    expect(heading.value).toBe("# ")
  })

  it("Enter at the end of a numbered item continues with the next literal number", () => {
    renderEditor({ blocks: [createBlock("numbered-list-item", { id: "a", text: "1. first" })] })
    const [ta] = textboxes()
    if (ta === undefined) throw new Error("expected a textarea")
    fireBeforeInput(ta, "insertLineBreak", null)
    expect(textboxes().map((t) => t.value)).toEqual(["1. first", "2. "])
  })

  it("clicking a to-do's literal marker flips '[ ] ' ↔ '[x] ' in its text", () => {
    renderEditor({ blocks: [{ id: "a", type: "to-do", text: "[ ] task" }] })
    const ta = screen.getByLabelText<HTMLTextAreaElement>("To-do")
    ta.setSelectionRange(1, 1)
    fireEvent.click(ta)
    expect(screen.getByLabelText<HTMLTextAreaElement>("To-do").value).toBe("[x] task")
  })

  it("heals a legacy marker-less body on read (injects the literal marker)", () => {
    renderEditor({
      blocks: [
        { id: "a", type: "bulleted-list-item", text: "milk" },
        { id: "b", type: "to-do", text: "done", checked: true },
      ],
    })
    expect(screen.getByLabelText<HTMLTextAreaElement>("List").value).toBe("- milk")
    expect(screen.getByLabelText<HTMLTextAreaElement>("To-do").value).toBe("[x] done")
  })
})
