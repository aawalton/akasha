import { afterEach, describe, expect, it } from "bun:test"
import { act, cleanup, fireEvent, screen } from "@shared/utils-test"
import { render } from "@shared/utils-test/render"
import { __resetKeyboardRegistryForTest, useKeyboardBinding } from "../hooks/use-keyboard-registry"
import { PALETTE_ONLY } from "../utils/keyboard-registry"
import { CommandPalette } from "./command-palette"
import { ShortcutSheet } from "./shortcut-sheet"

afterEach(() => {
  cleanup()
  __resetKeyboardRegistryForTest()
  localStorage.clear()
})

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

function pressZ() {
  act(() => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "z",
        code: "KeyZ",
        bubbles: true,
        cancelable: true,
      })
    )
  })
}

function Harness() {
  useKeyboardBinding({
    id: "save",
    chord: "Mod+S",
    label: "Save",
    layer: "conventional",
    onTrigger: () => {},
  })
  useKeyboardBinding({
    id: "toggle-panel",
    chord: "Mod+Alt+P",
    label: "Toggle panel",
    layer: "house",
    group: "Panels",
    onTrigger: () => {},
  })
  return <ShortcutSheet />
}

describe("ShortcutSheet — the ? discoverability surface", () => {
  it("stays closed until ? is pressed", () => {
    render(<Harness />)
    expect(screen.queryByText("Keyboard shortcuts")).toBeNull()
  })

  it("opens on ? and lists active shortcuts beside their display chords", () => {
    render(<Harness />)
    pressQuestionMark()
    expect(screen.getByText("Keyboard shortcuts")).toBeTruthy()
    expect(screen.getByText("Save")).toBeTruthy()
    expect(screen.getByText("Ctrl+S")).toBeTruthy()
    expect(screen.getByText("Toggle panel")).toBeTruthy()
  })

  it("omits chord-less palette-only commands (no empty keycaps) while listing chorded ones", () => {
    function ChordlessHarness() {
      useKeyboardBinding({
        id: "save",
        chord: "Mod+S",
        label: "Save",
        layer: "conventional",
        onTrigger: () => {},
      })
      useKeyboardBinding({
        id: "nav-home",
        chord: PALETTE_ONLY,
        label: "Go to home",
        layer: "house",
        onTrigger: () => {},
      })
      return <ShortcutSheet />
    }
    render(<ChordlessHarness />)
    pressQuestionMark()
    expect(screen.getByText("Save")).toBeTruthy()
    expect(screen.queryByText("Go to home")).toBeNull()
  })

  it("drops a wholly chord-less layer's heading entirely (no orphan House section)", () => {
    function NavHarness() {
      useKeyboardBinding({
        id: "save",
        chord: "Mod+S",
        label: "Save",
        layer: "conventional",
        onTrigger: () => {},
      })
      useKeyboardBinding({
        id: "nav-home",
        chord: PALETTE_ONLY,
        label: "Go to home",
        layer: "house",
        group: "Navigation",
        onTrigger: () => {},
      })
      useKeyboardBinding({
        id: "nav-tasks",
        chord: PALETTE_ONLY,
        label: "Go to tasks",
        layer: "house",
        group: "Navigation",
        onTrigger: () => {},
      })
      return <ShortcutSheet />
    }
    render(<NavHarness />)
    pressQuestionMark()
    expect(screen.getByText("Save")).toBeTruthy()
    expect(screen.queryByText("House")).toBeNull()
    expect(screen.queryByText("Navigation")).toBeNull()
    expect(screen.queryByText("Go to home")).toBeNull()
    expect(screen.queryByText("Go to tasks")).toBeNull()
  })

  it("groups shortcuts by layer, in Reserved -> Conventional -> House order", () => {
    render(<Harness />)
    pressQuestionMark()
    const headers = screen.getAllByText(/^(Reserved|Conventional|House)$/)
    expect(headers.map((h) => h.textContent)).toEqual(["Conventional", "House"])
  })

  it("renders the WCAG 2.1.4 global disable toggle, off while shortcuts are enabled", () => {
    render(<Harness />)
    pressQuestionMark()
    const toggle = screen.getByLabelText("Disable keyboard shortcuts")
    expect(toggle).toBeTruthy()
    expect(toggle.getAttribute("aria-checked")).toBe("false")
  })

  it("the disable toggle turns character-key shortcuts off", () => {
    let count = 0
    function ProbeHarness() {
      useKeyboardBinding({
        id: "probe",
        chord: "z",
        label: "Probe",
        layer: "house",
        onTrigger: () => {
          count++
        },
      })
      return <ShortcutSheet />
    }
    render(<ProbeHarness />)
    pressQuestionMark()

    pressZ()
    expect(count).toBe(1)

    const toggle = screen.getByLabelText("Disable keyboard shortcuts")
    act(() => {
      fireEvent.click(toggle)
    })
    expect(toggle.getAttribute("aria-checked")).toBe("true")
    pressZ()
    expect(count).toBe(1)
  })

  it("omits the palette's shortcuts-toggle command — the sheet owns the visible switch", () => {
    function BothSurfaces() {
      useKeyboardBinding({
        id: "save",
        chord: "Mod+S",
        label: "Save",
        layer: "conventional",
        onTrigger: () => {},
      })
      return (
        <>
          <CommandPalette />
          <ShortcutSheet />
        </>
      )
    }
    render(<BothSurfaces />)
    pressQuestionMark()
    expect(screen.getByText("Save")).toBeTruthy()
    expect(screen.getAllByText("Disable keyboard shortcuts")).toHaveLength(1)
  })

  it("closes on Escape", () => {
    render(<Harness />)
    pressQuestionMark()
    expect(screen.getByText("Save")).toBeTruthy()
    act(() => {
      fireEvent.keyDown(document, { key: "Escape" })
    })
    expect(screen.queryByText("Save")).toBeNull()
  })
})
