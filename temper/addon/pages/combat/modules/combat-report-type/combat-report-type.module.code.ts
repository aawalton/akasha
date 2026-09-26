import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/addon/pages/combat/combat-controls-report/combat-controls-report.type-declaration.d.ts"

export const REPORT_SIZE = 15

export function reportFont(this: void, size: number, style = ""): string {
  return string.format("%s|%s|%s", GetString(SI_TEMPER_COMBAT_STD_FONT), size, style)
}
