import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import {
  BLUE,
  GREEN,
  ORANGE,
  PURPLE,
  RED,
  YELLOW,
} from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PALETTE: Readonly<Record<string, Rgb>> = {
  green: GREEN,
  blue: BLUE,
  yellow: YELLOW,
  purple: PURPLE,
  orange: ORANGE,
  red: RED,
  text: TEXT_PRIMARY,
}

export const PALETTE_ORDER: readonly string[] = Object.keys(PALETTE)

export const PALETTE_NAMES: ReadonlySet<string> = new Set(PALETTE_ORDER)

function toHex(rgb: Rgb): string {
  const channel = (value: number): string =>
    Math.max(0, Math.min(255, Math.round(value * 255)))
      .toString(16)
      .padStart(2, "0")
  return `#${channel(rgb[0])}${channel(rgb[1])}${channel(rgb[2])}`
}

export function colorNamed(name: string): string | undefined {
  const rgb = PALETTE[slugOf(name).toLowerCase()]
  return rgb === undefined ? undefined : toHex(rgb)
}
