import { afterEach, describe, expect, mock, test } from "bun:test"
import { createBlock, type V1BlockType } from "@shared/pages-core/property-types/rich-document-ops"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import type { BlockRowProps } from "./block-row"
import { useTextareaInput } from "./use-textarea-input"

afterEach(cleanup)

function makeProps(type: V1BlockType = "paragraph"): BlockRowProps {
  return {
    block: createBlock(type, { id: "b1", text: "" }),
    selected: false,
    onChangeText: mock(() => {}),
    onEnter: mock(() => {}),
    onArrowUp: mock(() => {}),
    onArrowDown: mock(() => {}),
    onDocumentExtreme: mock(() => {}),
    onBackspaceAtStart: mock(() => {}),
    onSlashTrigger: mock(() => {}),
    onToggleTodo: mock(() => {}),
    onShorthand: mock(() => {}),
    onTurnInto: mock(() => {}),
    onMoveBlock: mock(() => {}),
    onIndent: mock(() => {}),
    onOutdent: mock(() => {}),
    onDuplicate: mock(() => {}),
    onToggleCollapse: mock(() => {}),
    onEscape: mock(() => {}),
    onSelectRange: mock(() => {}),
    onSelectToggle: mock(() => {}),
    onFocusText: mock(() => {}),
    onBlur: mock(() => {}),
    textareaRef: () => {},
  }
}

function Harness({ props }: { props: BlockRowProps }) {
  const api = useTextareaInput(props)
  return <textarea aria-label="block" ref={api.ref} onKeyDown={api.onKeyDown} />
}

function setup(type: V1BlockType = "paragraph"): { props: BlockRowProps; textarea: HTMLElement } {
  const props = makeProps(type)
  render(<Harness props={props} />)
  return { props, textarea: screen.getByRole("textbox") }
}

function keyDown(
  textarea: HTMLElement,
  init: { key: string; code: string; metaKey?: boolean; ctrlKey?: boolean }
): boolean {
  return !fireEvent.keyDown(textarea, {
    key: init.key,
    code: init.code,
    metaKey: init.metaKey ?? false,
    ctrlKey: init.ctrlKey ?? false,
  })
}

describe("useTextareaInput onKeyDown — document-extremes dispatch", () => {
  const CASES: ReadonlyArray<{
    name: string
    key: string
    code: string
    mod: "meta" | "ctrl"
    expected: "start" | "end"
  }> = [
    {
      name: "Cmd+Up (mac) → start",
      key: "ArrowUp",
      code: "ArrowUp",
      mod: "meta",
      expected: "start",
    },
    {
      name: "Cmd+Down (mac) → end",
      key: "ArrowDown",
      code: "ArrowDown",
      mod: "meta",
      expected: "end",
    },
    { name: "Ctrl+Home (win) → start", key: "Home", code: "Home", mod: "ctrl", expected: "start" },
    { name: "Ctrl+End (win) → end", key: "End", code: "End", mod: "ctrl", expected: "end" },
  ]

  for (const c of CASES) {
    test(c.name, () => {
      const { props, textarea } = setup()
      const prevented = keyDown(textarea, {
        key: c.key,
        code: c.code,
        metaKey: c.mod === "meta",
        ctrlKey: c.mod === "ctrl",
      })
      expect(props.onDocumentExtreme).toHaveBeenCalledTimes(1)
      expect(props.onDocumentExtreme).toHaveBeenCalledWith(c.expected)
      expect(prevented).toBe(true)
    })
  }
})

describe("useTextareaInput onKeyDown — L0 native keys pass through", () => {
  const L0: ReadonlyArray<{ name: string; key: string; code: string }> = [
    { name: "Cmd+C (copy)", key: "c", code: "KeyC" },
    { name: "Cmd+V (paste)", key: "v", code: "KeyV" },
    { name: "Cmd+X (cut)", key: "x", code: "KeyX" },
    { name: "Cmd+A (select-all)", key: "a", code: "KeyA" },
    { name: "Cmd+Z (undo)", key: "z", code: "KeyZ" },
  ]

  for (const c of L0) {
    test(`${c.name} is not intercepted`, () => {
      const { props, textarea } = setup()
      const prevented = keyDown(textarea, { key: c.key, code: c.code, metaKey: true })
      expect(props.onDocumentExtreme).not.toHaveBeenCalled()
      expect(prevented).toBe(false)
    })
  }
})

describe("useTextareaInput onKeyDown — Ctrl/Cmd+Enter keeps toggle-collapse (#15856 ruling)", () => {
  test("Ctrl+Enter on a toggle block toggles collapse (kept, not rebound)", () => {
    const { props, textarea } = setup("toggle")
    const prevented = keyDown(textarea, { key: "Enter", code: "Enter", ctrlKey: true })
    expect(props.onToggleCollapse).toHaveBeenCalledTimes(1)
    expect(props.onDocumentExtreme).not.toHaveBeenCalled()
    expect(prevented).toBe(true)
  })

  test("Cmd+Enter on a non-toggle block toggles nothing", () => {
    const { props, textarea } = setup("paragraph")
    keyDown(textarea, { key: "Enter", code: "Enter", metaKey: true })
    expect(props.onToggleCollapse).not.toHaveBeenCalled()
  })
})
