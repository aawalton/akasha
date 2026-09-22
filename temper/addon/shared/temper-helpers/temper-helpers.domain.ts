import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperHelpers = {
  id: "01a08d72-671a-7ba4-875c-f5296652fc14",
  type: "page-type/domain",
  slug: "temper-helpers",
  definition:
    "the codec, color and game helpers an add-on carries and leaves in the game's globals",
  parts: [
    "module/helpers",
    "module/helpers-casts",
    "module/helpers-codec",
    "module/helpers-color",
    "module/helpers-game",
    "module/helpers-tables",
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
