import type { BarSettings } from "@akasha/temper-combat-addon/combat-actions-saved-variables"

export function buildFont(name: string, size: number, style: string): string {
  return name + "|" + size + "|" + style
}

export function getLabelFont(s: BarSettings): string {
  return buildFont(s.barLabelFontName, s.barLabelFontSize, s.barLabelFontStyle)
}

export function getStackLabelFont(s: BarSettings): string {
  return buildFont(s.barStackLabelFontName, s.barStackLabelFontSize, s.barStackLabelFontStyle)
}
