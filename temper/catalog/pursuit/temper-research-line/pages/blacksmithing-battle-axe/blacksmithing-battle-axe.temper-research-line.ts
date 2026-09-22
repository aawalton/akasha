import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingBattleAxe = {
  id: "01a0616b-2ce0-7003-aea6-f930a51dff09",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-battle-axe",
  title: "Battle Axe",
  displayOrder: 4,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
