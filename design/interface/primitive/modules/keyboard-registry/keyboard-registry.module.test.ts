import { expect, test } from "bun:test"
import {
  describeBindings,
  type KeyBinding,
} from "akasha/design/interface/primitive/modules/keyboard-registry/keyboard-registry.module.code.ts"

function chordedAs(id: string, chord: string, label: string): KeyBinding {
  return { id, chord, label, onTrigger: () => undefined }
}

test("two registrations of one id are described once", () => {
  const described = describeBindings(
    [
      chordedAs("panel.toggle-all", "Mod+Alt+T", "Expand / collapse all panels"),
      chordedAs("panel.toggle-all", "Mod+Alt+T", "Expand / collapse all panels"),
    ],
    "other"
  )
  expect(described).toHaveLength(1)
  expect(described[0]?.display).toBe("Ctrl+Alt+T")
})

test("the last registration of an id describes it, and the first sets where it sits", () => {
  const described = describeBindings(
    [
      chordedAs("house.command-palette", "Mod+K", "Open command palette"),
      chordedAs("panel.toggle-all", "Mod+Alt+T", "mounted first"),
      chordedAs("house.shortcut-sheet", "?", "Show keyboard shortcuts"),
      chordedAs("panel.toggle-all", "Mod+Alt+T", "mounted last"),
    ],
    "other"
  )
  expect(described.map((one) => one.id)).toEqual([
    "house.command-palette",
    "panel.toggle-all",
    "house.shortcut-sheet",
  ])
  expect(described[1]?.label).toBe("mounted last")
})
