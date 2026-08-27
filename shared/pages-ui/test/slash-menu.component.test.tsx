import { afterEach, describe, expect, it, mock } from "bun:test"
import { cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { type SlashChoice, SlashMenu } from "../src/block-editor/slash-menu"

afterEach(() => {
  cleanup()
})

function renderMenu(overrides?: {
  onSelect?: (choice: SlashChoice) => void
  onClose?: () => void
}) {
  const onSelect = overrides?.onSelect ?? mock((_c: SlashChoice) => {})
  const onClose = overrides?.onClose ?? mock(() => {})
  render(
    <SlashMenu open onSelect={onSelect} onClose={onClose}>
      <div>anchor</div>
    </SlashMenu>
  )
  const input = screen.getByPlaceholderText("Filter blocks…")
  const options = () => screen.getAllByRole("option")
  const highlightedIndex = () =>
    options().findIndex((el) => el.getAttribute("aria-selected") === "true")
  return { onSelect, onClose, input, options, highlightedIndex }
}

describe("SlashMenu — keyboard navigation", () => {
  it("renders one option per v1 block choice with the first highlighted", () => {
    const { options, highlightedIndex } = renderMenu()
    expect(options().length).toBe(11)
    expect(highlightedIndex()).toBe(0)
  })

  it("offers the Toggle block choice (#14641)", () => {
    const { options } = renderMenu()
    const labels = options().map((el) => el.textContent)
    expect(labels).toContain("Toggle")
  })

  it("ArrowDown / ArrowUp move the highlight", () => {
    const { input, highlightedIndex } = renderMenu()
    fireEvent.keyDown(input, { key: "ArrowDown" })
    expect(highlightedIndex()).toBe(1)
    fireEvent.keyDown(input, { key: "ArrowDown" })
    expect(highlightedIndex()).toBe(2)
    fireEvent.keyDown(input, { key: "ArrowUp" })
    expect(highlightedIndex()).toBe(1)
  })

  it("wraps: ArrowUp from the first item lands on the last", () => {
    const { input, options, highlightedIndex } = renderMenu()
    expect(highlightedIndex()).toBe(0)
    fireEvent.keyDown(input, { key: "ArrowUp" })
    expect(highlightedIndex()).toBe(options().length - 1)
  })

  it("wraps: ArrowDown from the last item lands on the first", () => {
    const { input, options, highlightedIndex } = renderMenu()
    fireEvent.keyDown(input, { key: "ArrowUp" })
    expect(highlightedIndex()).toBe(options().length - 1)
    fireEvent.keyDown(input, { key: "ArrowDown" })
    expect(highlightedIndex()).toBe(0)
  })

  it("Enter selects the highlighted command", () => {
    const onSelect = mock((_c: SlashChoice) => {})
    const { input } = renderMenu({ onSelect })
    fireEvent.keyDown(input, { key: "ArrowDown" })
    fireEvent.keyDown(input, { key: "Enter" })
    expect(onSelect).toHaveBeenCalledTimes(1)
    const choice = onSelect.mock.calls[0]?.[0]
    expect(choice?.key).toBe("heading-1")
  })

  it("Escape dismisses the menu", () => {
    const onClose = mock(() => {})
    const { input } = renderMenu({ onClose })
    fireEvent.keyDown(input, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("the highlighted item carries the shared selected-state styling hook", () => {
    const { options } = renderMenu()
    for (const el of options()) {
      expect(el.className).toContain("data-[selected=true]:bg-primary/12")
    }
  })
})
