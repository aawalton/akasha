import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperLccc = {
  id: "01a08d72-671a-7ba4-875c-f5296652fc14",
  type: "page-type/domain",
  slug: "temper-lccc",
  definition: "the helper table an add-on leaves in the game's globals as TemperCodesCommonCode",
  parts: [
    "module/lccc",
    "module/lccc-casts",
    "module/lccc-codec",
    "module/lccc-color",
    "module/lccc-util",
    "module/lccc-util-tables",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on reaching this code carries its own copy inside its own bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The copy an add-on carries is the copy that table holds, whatever was there before.",
    },
  ],
} as const satisfies Domain
