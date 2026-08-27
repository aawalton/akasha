import { afterEach, describe, expect, it, mock } from "bun:test"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { __resetKeyboardRegistryForTest, useKeyboardBinding } from "../hooks/use-keyboard-registry"
import { PALETTE_ONLY } from "../utils/keyboard-registry"
import { CommandPalette } from "./command-palette"

afterEach(() => {
  cleanup()
  __resetKeyboardRegistryForTest()
  localStorage.clear()
})

const PLACEHOLDER = "Search commands…"

function pressModK() {
  act(() => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        code: "KeyK",
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      })
    )
  })
}

function pressQuestionMark() {
  act(() => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "?",
        code: "Slash",
        shiftKey: true,
        bubbles: true,
        cancelable: true,
      })
    )
  })
}

function Harness({
  onAlpha = () => {},
  onBeta = () => {},
}: {
  onAlpha?: () => void
  onBeta?: () => void
}) {
  useKeyboardBinding({
    id: "alpha",
    chord: "Mod+Alt+A",
    label: "Alpha action",
    layer: "house",
    onTrigger: onAlpha,
  })
  useKeyboardBinding({
    id: "beta",
    chord: "Mod+Alt+B",
    label: "Beta action",
    layer: "house",
    onTrigger: onBeta,
  })
  return <CommandPalette />
}

describe("CommandPalette — the Mod+K discoverability surface", () => {
  it("stays closed until Mod+K is pressed", () => {
    render(<Harness />)
    expect(screen.queryByPlaceholderText(PLACEHOLDER)).toBeNull()
  })

  it("opens on Mod+K with the search field focused", () => {
    render(<Harness />)
    pressModK()
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    expect(input).toBeTruthy()
    expect(document.activeElement).toBe(input)
  })

  it("lists the registered chorded actions beside their display chord", () => {
    render(<Harness />)
    pressModK()
    expect(screen.getByText("Alpha action")).toBeTruthy()
    expect(screen.getByText("Beta action")).toBeTruthy()
    expect(screen.getByText("Ctrl+Alt+A")).toBeTruthy()
  })

  it("lists chord-less palette-only commands alongside chorded ones, searchable by label", () => {
    function ChordlessHarness() {
      useKeyboardBinding({
        id: "alpha",
        chord: "Mod+Alt+A",
        label: "Alpha action",
        layer: "house",
        onTrigger: () => {},
      })
      useKeyboardBinding({
        id: "nav-home",
        chord: PALETTE_ONLY,
        label: "Go to home",
        layer: "house",
        onTrigger: () => {},
      })
      return <CommandPalette />
    }
    render(<ChordlessHarness />)
    pressModK()
    expect(screen.getByText("Alpha action")).toBeTruthy()
    expect(screen.getByText("Go to home")).toBeTruthy()
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    act(() => {
      fireEvent.change(input, { target: { value: "home" } })
    })
    expect(screen.getByText("Go to home")).toBeTruthy()
    expect(screen.queryByText("Alpha action")).toBeNull()
  })

  it("filters the list as the user types (match on label)", () => {
    render(<Harness />)
    pressModK()
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    act(() => {
      fireEvent.change(input, { target: { value: "alpha" } })
    })
    expect(screen.getByText("Alpha action")).toBeTruthy()
    expect(screen.queryByText("Beta action")).toBeNull()
  })

  it("runs the selected action via triggerBinding and closes on Enter", () => {
    const onAlpha = mock(() => {})
    render(<Harness onAlpha={onAlpha} />)
    pressModK()
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    act(() => {
      fireEvent.change(input, { target: { value: "alpha" } })
    })
    act(() => {
      fireEvent.keyDown(input, { key: "Enter" })
    })
    expect(onAlpha).toHaveBeenCalledTimes(1)
    expect(screen.queryByPlaceholderText(PLACEHOLDER)).toBeNull()
  })

  it("moves the highlight with ArrowDown / ArrowUp", () => {
    render(<Harness />)
    pressModK()
    const input = screen.getByPlaceholderText(PLACEHOLDER)
    const options = () => screen.getAllByRole("option")
    const highlighted = () =>
      options().findIndex((el) => el.getAttribute("aria-selected") === "true")
    expect(highlighted()).toBe(0)
    act(() => {
      fireEvent.keyDown(input, { key: "ArrowDown" })
    })
    expect(highlighted()).toBe(1)
    act(() => {
      fireEvent.keyDown(input, { key: "ArrowUp" })
    })
    expect(highlighted()).toBe(0)
  })

  it("dismisses on Escape", () => {
    render(<Harness />)
    pressModK()
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy()
    act(() => {
      fireEvent.keyDown(document, { key: "Escape" })
    })
    expect(screen.queryByPlaceholderText(PLACEHOLDER)).toBeNull()
  })

  it("lists the shortcuts-toggle command, labelled for the current state", () => {
    render(<Harness />)
    pressModK()
    expect(screen.getByText("Disable keyboard shortcuts")).toBeTruthy()
  })

  it("re-enables shortcuts from a disabled state — the self-trap round-trip", () => {
    let probeFired = 0
    function TrappedHarness() {
      useKeyboardBinding({
        id: "probe",
        chord: "?",
        label: "Probe action",
        layer: "house",
        onTrigger: () => {
          probeFired++
        },
      })
      return <CommandPalette />
    }
    localStorage.setItem("keyboard-shortcuts-enabled", "false")
    render(<TrappedHarness />)

    pressQuestionMark()
    expect(probeFired).toBe(0)

    pressModK()
    expect(screen.getByPlaceholderText(PLACEHOLDER)).toBeTruthy()

    const command = screen.getByText("Enable keyboard shortcuts")
    act(() => {
      fireEvent.click(command)
    })

    pressQuestionMark()
    expect(probeFired).toBe(1)

    pressModK()
    expect(screen.getAllByText("Disable keyboard shortcuts")).toHaveLength(1)
  })

  it("restores focus to the previously-focused element on close", () => {
    render(
      <div>
        <button type="button" data-testid="before">
          before
        </button>
        <Harness />
      </div>
    )
    const before = screen.getByTestId("before")
    before.focus()
    expect(document.activeElement).toBe(before)
    pressModK()
    expect(document.activeElement).not.toBe(before)
    act(() => {
      fireEvent.keyDown(document, { key: "Escape" })
    })
    expect(document.activeElement).toBe(before)
  })
})
