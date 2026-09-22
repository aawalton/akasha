import type { TemperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.types.ts"

export const noCompanion = {
  id: "01a05fcf-5920-7bb6-bd19-59114eea557e",
  type: "page-type/temper-eso-companion",
  slug: "no-companion",
  key: "no-companion",
  title: "No Companion",
  alliance: "temper-alliance/no-alliance",
  esoCompanionId: 0,
} as const satisfies TemperEsoCompanion
