import type { ChecklistSection } from "akasha/temper/addon/pages/characters/modules/characters-build-checklist/characters-build-checklist.module.code.ts"
import {
  HUD_COUNT_GAP,
  HUD_ROW_HEIGHT,
  hudColor,
  hudIndent,
  styleHudLine,
} from "akasha/temper/addon/pages/characters/modules/characters-hud-line/characters-hud-line.module.code.ts"
import { progressSuffix } from "akasha/temper/addon/pages/characters/modules/characters-progress-format/characters-progress-format.module.code.ts"
import {
  colorOf,
  colorText,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { LINE_HEIGHT } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

const SMALL_WORDS = new Set(["a", "an", "and", "for", "of", "on", "or", "the", "to"])

function titleCase(title: string): string {
  return title
    .split(" ")
    .map((word, at) =>
      at > 0 && SMALL_WORDS.has(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ")
}

export function lineLabel(window: Control): LabelControl {
  const label = WINDOW_MANAGER.CreateControl(undefined, window, CT_LABEL)
  label.SetHeight(HUD_ROW_HEIGHT)
  label.SetVerticalAlignment(TEXT_ALIGN_CENTER)
  label.SetHidden(true)
  return label
}

export function linkLabel(window: Control, onClick: (this: void) => undefined): LabelControl {
  const link = lineLabel(window)
  styleHudLine(link, hudColor("blue"))
  link.SetMouseEnabled(true)
  link.SetHandler("OnMouseEnter", () => colorText(link, colorOf("strong")))
  link.SetHandler("OnMouseExit", () => colorText(link, hudColor("blue")))
  link.SetHandler("OnMouseUp", (_link: Control, button: number, upInside: boolean) => {
    if (upInside && button === MOUSE_BUTTON_INDEX_LEFT) onClick()
  })
  return link
}

function showHeading(
  label: LabelControl,
  count: LabelControl,
  title: string,
  met: number,
  total: number
): number {
  const color = met === total ? hudColor("done") : hudColor("gold")
  styleHudLine(label, color)
  label.SetText(titleCase(title))
  styleHudLine(count, color)
  count.SetText(progressSuffix(met, total))
  return HUD_COUNT_GAP + count.GetTextWidth()
}

function showUnmet(label: LabelControl, text: string): undefined {
  styleHudLine(label, hudColor("plain"))
  label.SetText(hudIndent(1) + text)
  return undefined
}

export interface ShownRow {
  readonly label: LabelControl
  readonly count?: LabelControl
  readonly trailing: number
}

export function showRows(
  lines: readonly LabelControl[],
  counts: readonly LabelControl[],
  sections: readonly ChecklistSection[],
  budget: number
): readonly ShownRow[] {
  const rows: ShownRow[] = []
  const room = math.min(budget, lines.length)
  for (const section of sections) {
    const label = lines[rows.length]
    const count = counts[rows.length]
    if (rows.length >= room || label === undefined || count === undefined) break
    const unmet = section.lines.filter((line) => !line.met)
    const met = section.lines.length - unmet.length
    const trailing = showHeading(label, count, section.title, met, section.lines.length)
    rows.push({ label, count, trailing })
    for (let at = 0; at < unmet.length; at++) {
      const row = lines[rows.length]
      if (rows.length >= room || row === undefined) break
      const left = unmet.length - at
      const cropped = rows.length === room - 1 && left > 1
      showUnmet(row, cropped ? `and ${left} more` : (unmet[at]?.text ?? ""))
      rows.push({ label: row, trailing: 0 })
    }
  }
  return rows
}

export function wrapTo(label: LabelControl, width: number): undefined {
  label.SetWidth(width)
  label.SetHeight(math.max(HUD_ROW_HEIGHT, label.GetTextHeight() + HUD_ROW_HEIGHT - LINE_HEIGHT))
  return undefined
}
