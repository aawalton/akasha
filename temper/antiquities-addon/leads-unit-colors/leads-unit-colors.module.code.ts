import {
  BLUE_TEXT_HEX,
  DEFAULT_TEXT_RGBA,
  GOLD_TEXT_HEX,
  GREEN_TEXT_HEX,
  ORANGE_TEXT_HEX,
  PURPLE_TEXT_HEX,
  RED_TEXT_HEX,
  YELLOW_TEXT_HEX,
} from "../leads-colors/leads-colors.module.code.ts"
import type { LeadsColor } from "../leads-unit-shapes/leads-unit-shapes.module.code.ts"

const [defaultR, defaultG, defaultB, defaultA] = DEFAULT_TEXT_RGBA
const DEFAULT_TEXT = ZO_ColorDef.New(defaultR, defaultG, defaultB, defaultA)
const GREEN_TEXT = ZO_ColorDef.New(GREEN_TEXT_HEX)
const BLUE_TEXT = ZO_ColorDef.New(BLUE_TEXT_HEX)
const PURPLE_TEXT = ZO_ColorDef.New(PURPLE_TEXT_HEX)
const GOLD_TEXT = ZO_ColorDef.New(GOLD_TEXT_HEX)
const ORANGE_TEXT = ZO_ColorDef.New(ORANGE_TEXT_HEX)
const YELLOW_TEXT = ZO_ColorDef.New(YELLOW_TEXT_HEX)
const RED_TEXT = ZO_ColorDef.New(RED_TEXT_HEX)

export function getColorCode(intValue: number): LeadsColor {
  if (intValue === 1) {
    return GREEN_TEXT
  }
  if (intValue === 2) {
    return BLUE_TEXT
  }
  if (intValue === 3) {
    return PURPLE_TEXT
  }
  if (intValue === 4) {
    return GOLD_TEXT
  }
  if (intValue === 5) {
    return ORANGE_TEXT
  }
  return DEFAULT_TEXT
}

export function colorizeExpiration(leadTimeLeft: number): LeadsColor {
  if (leadTimeLeft < 3600) {
    return RED_TEXT
  }
  if (leadTimeLeft < 86400) {
    return ORANGE_TEXT
  }
  if (leadTimeLeft < 604800) {
    return YELLOW_TEXT
  }
  return GREEN_TEXT
}
