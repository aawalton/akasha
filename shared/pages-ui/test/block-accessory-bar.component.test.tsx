import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import {
  accessoryBarBottomPadding,
  BlockAccessoryBar,
  type BlockAccessoryBarProps,
} from "../src/block-editor/block-accessory-bar"

afterEach(() => {
  cleanup()
})

type Handlers = Pick<
  BlockAccessoryBarProps,
  "onIndent" | "onOutdent" | "onMoveUp" | "onMoveDown" | "onDelete" | "onDuplicate" | "onTurnInto"
>

function setup(insetOverride?: number) {
  const handlers: Handlers = {
    onIndent: mock(() => {}),
    onOutdent: mock(() => {}),
    onMoveUp: mock(() => {}),
    onMoveDown: mock(() => {}),
    onDelete: mock(() => {}),
    onDuplicate: mock(() => {}),
    onTurnInto: mock(() => {}),
  }
  render(<BlockAccessoryBar inset={insetOverride ?? 0} {...handlers} />)
  return handlers
}

const BUTTONS: ReadonlyArray<{ label: string; handler: keyof Handlers }> = [
  { label: "Indent", handler: "onIndent" },
  { label: "Outdent", handler: "onOutdent" },
  { label: "Move up", handler: "onMoveUp" },
  { label: "Move down", handler: "onMoveDown" },
  { label: "Turn into", handler: "onTurnInto" },
  { label: "Duplicate", handler: "onDuplicate" },
  { label: "Delete block", handler: "onDelete" },
]

describe("BlockAccessoryBar", () => {
  it("renders all 7 block-level actions as a toolbar", () => {
    setup()
    expect(screen.getByRole("toolbar", { name: "Block actions" })).toBeDefined()
    for (const { label } of BUTTONS) {
      expect(screen.getByRole("button", { name: label })).toBeDefined()
    }
    expect(screen.getAllByRole("button")).toHaveLength(BUTTONS.length)
  })

  for (const { label, handler } of BUTTONS) {
    it(`"${label}" fires ${handler} on pointerdown and no other handler`, () => {
      const handlers = setup()
      const button = screen.getByRole("button", { name: label })
      fireEvent.pointerDown(button)
      expect(handlers[handler]).toHaveBeenCalledTimes(1)
      for (const { handler: other } of BUTTONS) {
        if (other !== handler) expect(handlers[other]).not.toHaveBeenCalled()
      }
    })
  }

  it("cancels the pointerdown default so the textarea keeps focus (keyboard stays up)", () => {
    setup()
    const button = screen.getByRole("button", { name: "Indent" })
    const notCancelled = fireEvent.pointerDown(button)
    expect(notCancelled).toBe(false)
  })

  for (const { label } of BUTTONS) {
    it(`"${label}" also cancels the mousedown default (iOS focus-steal hardening, #15514)`, () => {
      setup()
      const button = screen.getByRole("button", { name: label })
      const notCancelled = fireEvent.mouseDown(button)
      expect(notCancelled).toBe(false)
    })
  }

  it("lifts the bar by the keyboard inset", () => {
    setup(291)
    const toolbar = screen.getByRole("toolbar", { name: "Block actions" })
    expect(toolbar.style.transform).toBe("translateY(-291px)")
  })
})

describe("accessoryBarBottomPadding", () => {
  it("omits the safe-area pad while lifted above the keyboard", () => {
    expect(accessoryBarBottomPadding(291)).toEqual({})
  })

  it("applies the safe-area pad at rest (no software keyboard)", () => {
    expect(accessoryBarBottomPadding(0)).toEqual({
      paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))",
    })
  })
})
