import {
  faceOf,
  sizeOf,
  type TypeSize,
} from "akasha/temper/window/modules/type-scale/type-scale.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-controls-report/combat-controls-report.type-declaration.d.ts"

export type FontSpec = [string, string | number, string]

const NO_SHADOW = ""

const SIZE_OF_GAME_SIZE: Readonly<Record<string, TypeSize>> = {
  "14": "xs",
  "15": "sm",
  "20": "lg",
}

export const REPORT_FACE = faceOf(400)

export const REPORT_SIZE = sizeOf("sm")

export function reportFontOf(this: void, gameSpec: FontSpec): FontSpec {
  const [face, size] = gameSpec
  const heading = face === GetString(SI_TEMPER_COMBAT_BOLD_FONT)
  const scaled = SIZE_OF_GAME_SIZE[tostring(size)] ?? "sm"
  return [heading ? faceOf(500) : REPORT_FACE, sizeOf(scaled), NO_SHADOW]
}

export function reportFont(this: void, size: number): string {
  return `${REPORT_FACE}|${size}`
}
