import type { TemperCurse } from "akasha/temper/catalog/effect/temper-curse/temper-curse.page-type.types.ts"

export const werewolf = {
  id: "01a05fc5-c92d-7adc-ad4b-ae6284705bc9",
  type: "page-type/temper-curse",
  slug: "werewolf",
  title: "Werewolf",
  key: "werewolf",
  displayOrder: 2,
  esoCurseIds: [35658, 32455],
  hashPlace: 2,
  createdAt: "2026-09-02T01:39:52.749Z",
  updatedAt: "2026-09-26T20:38:39.000Z",
} as const satisfies TemperCurse
