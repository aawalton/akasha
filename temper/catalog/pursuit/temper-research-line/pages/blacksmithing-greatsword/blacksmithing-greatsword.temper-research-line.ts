import type { TemperResearchLine } from "akasha/temper/catalog/pursuit/temper-research-line/temper-research-line.page-type.types.ts"

export const blacksmithingGreatsword = {
  id: "01a0616b-2ce0-7005-9973-6b5ebffd88ae",
  type: "page-type/temper-research-line",
  slug: "blacksmithing-greatsword",
  title: "Greatsword",
  displayOrder: 6,
  parent: "temper-craft-type/blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
