import { afterEach, describe, expect, it, mock } from "bun:test"
import type { ShorthandTransform } from "@shared/pages-core/property-types/markdown-shorthand"
import type { Block } from "@shared/pages-core/property-types/rich-document"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { BlockRow, type BlockRowProps } from "../src/block-editor/block-row"

afterEach(() => {
  cleanup()
})

function setup(overrides: Partial<BlockRowProps> & { block: Block }) {
  const onShorthand = mock((_t: ShorthandTransform) => {})
  const onEnter = mock((_caret: number) => {})
  const onToggleCollapse = mock(() => {})
  const onToggleTodo = mock(() => {})
  const props: BlockRowProps = {
    block: overrides.block,
    selected: overrides.selected ?? false,
    onChangeText: mock((_t: string) => {}),
    onEnter,
    onArrowUp: mock(() => {}),
    onArrowDown: mock(() => {}),
    onBackspaceAtStart: mock(() => {}),
    onSlashTrigger: mock(() => {}),
    onToggleTodo,
    onShorthand,
    onTurnInto: mock(() => {}),
    onMoveBlock: mock(() => {}),
    onIndent: mock(() => {}),
    onOutdent: mock(() => {}),
    onDuplicate: mock(() => {}),
    onToggleCollapse,
    onEscape: mock(() => {}),
    onSelectRange: mock(() => {}),
    onSelectToggle: mock(() => {}),
    onFocusText: mock(() => {}),
    onBlur: mock(() => {}),
    textareaRef: () => {},
  }
  render(<BlockRow {...props} />)
  const textarea = screen.getByRole<HTMLTextAreaElement>("textbox")
  return { textarea, onShorthand, onEnter, onToggleCollapse, onToggleTodo }
}

function fireBeforeInput(
  textarea: HTMLTextAreaElement,
  inputType: string,
  data: string | null
): boolean {
  textarea.focus()
  textarea.setSelectionRange(textarea.value.length, textarea.value.length)
  const evt = new InputEvent("beforeinput", { inputType, data, cancelable: true, bubbles: true })
  return textarea.dispatchEvent(evt)
}

const typeSpace = (t: HTMLTextAreaElement) => fireBeforeInput(t, "insertText", " ")
const typeEnter = (t: HTMLTextAreaElement) => fireBeforeInput(t, "insertLineBreak", null)

describe("BlockRow — space-triggered shorthand (via beforeinput)", () => {
  it("fires heading-1 transform for '#' + space and suppresses the space", () => {
    const { textarea, onShorthand } = setup({ block: { id: "a", type: "paragraph", text: "#" } })
    const notPrevented = typeSpace(textarea)
    expect(onShorthand).toHaveBeenCalledTimes(1)
    expect(onShorthand).toHaveBeenCalledWith({
      kind: "turn",
      type: "heading",
      level: 1,
      marker: "# ",
    })
    expect(notPrevented).toBe(false)
  })

  it("fires bullet transform for '-' + space", () => {
    const { textarea, onShorthand } = setup({ block: { id: "a", type: "paragraph", text: "-" } })
    typeSpace(textarea)
    expect(onShorthand).toHaveBeenCalledWith({
      kind: "turn",
      type: "bulleted-list-item",
      marker: "- ",
    })
  })

  it("fires numbered transform for '1.' + space", () => {
    const { textarea, onShorthand } = setup({ block: { id: "a", type: "paragraph", text: "1." } })
    typeSpace(textarea)
    expect(onShorthand).toHaveBeenCalledWith({
      kind: "turn",
      type: "numbered-list-item",
      marker: "1. ",
    })
  })

  it("fires checked to-do transform for '[x]' + space", () => {
    const { textarea, onShorthand } = setup({ block: { id: "a", type: "paragraph", text: "[x]" } })
    typeSpace(textarea)
    expect(onShorthand).toHaveBeenCalledWith({
      kind: "turn",
      type: "to-do",
      checked: true,
      marker: "[x] ",
    })
  })

  it("fires code transform for triple-backtick + space", () => {
    const { textarea, onShorthand } = setup({ block: { id: "a", type: "paragraph", text: "```" } })
    typeSpace(textarea)
    expect(onShorthand).toHaveBeenCalledWith({ kind: "turn", type: "code", marker: "``` " })
  })

  it("does NOT fire on space when content is already typed past the prefix", () => {
    const { textarea, onShorthand } = setup({
      block: { id: "a", type: "paragraph", text: "# hello" },
    })
    const notPrevented = typeSpace(textarea)
    expect(onShorthand).not.toHaveBeenCalled()
    expect(notPrevented).toBe(true)
  })

  it("fires toggle transform for '>' + space, seeding the literal '> '", () => {
    const { textarea, onShorthand } = setup({ block: { id: "a", type: "paragraph", text: ">" } })
    typeSpace(textarea)
    expect(onShorthand).toHaveBeenCalledWith({ kind: "turn", type: "toggle", marker: "> " })
  })

  it("fires quote transform for '\"' + space (kept in text as plain markdown)", () => {
    const { textarea, onShorthand } = setup({ block: { id: "a", type: "paragraph", text: '"' } })
    typeSpace(textarea)
    expect(onShorthand).toHaveBeenCalledWith({ kind: "turn", type: "quote", marker: '" ' })
  })
})

describe("BlockRow — plain-text-forward literal rendering", () => {
  it("shows a bullet's literal '- ' marker with no substituted glyph", () => {
    setup({ block: { id: "a", type: "bulleted-list-item", text: "- milk" } })
    const textarea = screen.getByRole<HTMLTextAreaElement>("textbox")
    expect(textarea.value).toBe("- milk")
    expect(screen.queryByText("•")).toBeNull()
  })

  it("shows a numbered item's literal 'N. ' marker", () => {
    setup({ block: { id: "a", type: "numbered-list-item", text: "3. step" } })
    expect(screen.getByRole<HTMLTextAreaElement>("textbox").value).toBe("3. step")
  })

  it("renders a to-do's literal '[x] ' marker with a struck-through line, no checkbox widget", () => {
    setup({ block: { id: "a", type: "to-do", text: "[x] done" } })
    const textarea = screen.getByRole<HTMLTextAreaElement>("textbox")
    expect(textarea.value).toBe("[x] done")
    expect(textarea.className).toContain("line-through")
    expect(screen.queryByRole("checkbox")).toBeNull()
  })
})

describe("BlockRow — to-do click-to-toggle", () => {
  it("fires onToggleTodo when the click lands on the literal marker", () => {
    const { textarea, onToggleTodo } = setup({
      block: { id: "a", type: "to-do", text: "[ ] task" },
    })
    textarea.setSelectionRange(1, 1)
    fireEvent.click(textarea)
    expect(onToggleTodo).toHaveBeenCalledTimes(1)
  })

  it("does NOT toggle when the click lands in the content past the marker", () => {
    const { textarea, onToggleTodo } = setup({
      block: { id: "a", type: "to-do", text: "[ ] task" },
    })
    textarea.setSelectionRange(6, 6)
    fireEvent.click(textarea)
    expect(onToggleTodo).not.toHaveBeenCalled()
  })
})

describe("BlockRow — toggle rendering (plain-text-forward, #15038)", () => {
  it("renders a toggle as a plain textarea with its literal '> ' — no chevron button", () => {
    const { textarea } = setup({ block: { id: "a", type: "toggle", text: "> Section" } })
    expect(textarea.value).toBe("> Section")
    expect(textarea.getAttribute("aria-label")).toBe("Toggle")
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("fires onToggleCollapse when the click lands on the '> ' marker", () => {
    const { textarea, onToggleCollapse } = setup({
      block: { id: "a", type: "toggle", text: "> Section" },
    })
    textarea.setSelectionRange(0, 0)
    fireEvent.click(textarea)
    expect(onToggleCollapse).toHaveBeenCalledTimes(1)
  })

  it("does NOT toggle when the click lands in the content past the marker", () => {
    const { textarea, onToggleCollapse } = setup({
      block: { id: "a", type: "toggle", text: "> Section" },
    })
    textarea.setSelectionRange(5, 5)
    fireEvent.click(textarea)
    expect(onToggleCollapse).not.toHaveBeenCalled()
  })

  it("flips collapse from the keyboard via Ctrl+Enter", () => {
    const { textarea, onToggleCollapse } = setup({
      block: { id: "a", type: "toggle", text: "> Sec" },
    })
    fireEvent.keyDown(textarea, { key: "Enter", ctrlKey: true })
    expect(onToggleCollapse).toHaveBeenCalledTimes(1)
  })

  it("does not render its children — nesting is drawn by BlockTree, not the row", () => {
    setup({
      block: {
        id: "a",
        type: "toggle",
        text: "> Parent",
        children: [{ id: "c", type: "paragraph", text: "child text" }],
      },
    })
    expect(screen.queryByText("child text")).toBeNull()
  })
})

describe("BlockRow — Enter (via beforeinput)", () => {
  it("fires the '---' divider shorthand, not onEnter", () => {
    const { textarea, onShorthand, onEnter } = setup({
      block: { id: "a", type: "paragraph", text: "---" },
    })
    typeEnter(textarea)
    expect(onShorthand).toHaveBeenCalledWith({ kind: "divider" })
    expect(onEnter).not.toHaveBeenCalled()
  })

  it("falls through to onEnter(caret) for normal text", () => {
    const { textarea, onShorthand, onEnter } = setup({
      block: { id: "a", type: "paragraph", text: "hello" },
    })
    typeEnter(textarea)
    expect(onShorthand).not.toHaveBeenCalled()
    expect(onEnter).toHaveBeenCalledTimes(1)
    expect(onEnter).toHaveBeenCalledWith(5)
  })
})
