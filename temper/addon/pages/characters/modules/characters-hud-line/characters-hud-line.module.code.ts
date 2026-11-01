import {
  BLUE,
  GREEN,
  PURPLE,
  RED,
  YELLOW,
} from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import {
  colorOf,
  colorText,
  styleTextOverPlay,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import { STAT_ROW_HEIGHT } from "akasha/temper/window/modules/window-rows/window-rows.module.code.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

type HudRgb = readonly [number, number, number]

export type HudColor = "plain" | "done" | "urgent" | "gold" | "blue" | "purple"

export function hudColor(kind: HudColor): HudRgb {
  if (kind === "done") return GREEN
  if (kind === "urgent") return RED
  if (kind === "gold") return YELLOW
  if (kind === "blue") return BLUE
  if (kind === "purple") return PURPLE
  return colorOf("body")
}

export const HUD_ROW_HEIGHT = STAT_ROW_HEIGHT

export const HUD_COUNT_GAP = 16

const INDENT_UNIT = "    "

export function hudIndent(level: number): string {
  return INDENT_UNIT.repeat(level)
}

export function styleHudLine(label: LabelControl, color: HudRgb): LabelControl {
  return colorText(styleTextOverPlay(label, "strong"), color)
}
