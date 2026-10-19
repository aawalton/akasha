import type { TemperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.types.ts"

export const meticulousDisassembly = {
  id: "01a0e13c-001b-772f-b9b1-70bfaf10dff1",
  type: "page-type/temper-champion-star",
  slug: "meticulous-disassembly",
  title: "Meticulous Disassembly",
  description:
    "Improves the chances of extracting Woodworking, Blacksmithing, Clothing, and Jewelry Crafting ingredients and allows the refining of more powerful resins, tempers, tannins, and platings from raw materials",
  esoChampionSkillId: 83,
  championConstellation: "craft",
  isSlottable: false,
  hashPlace: 10,
  jumpPoints: [0, 50],
  createdAt: "2026-09-27T05:00:00.923Z",
  updatedAt: "2026-10-19T22:57:17.964Z",
} as const satisfies TemperChampionStar
