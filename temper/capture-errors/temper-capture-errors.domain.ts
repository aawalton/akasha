import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperCaptureErrors = {
  id: "01a0608a-15b2-7b81-afe8-cbf9d7803e3f",
  type: "domain",
  slug: "temper-capture-errors",
  definition: "the shape an error raised inside the game takes where the game saves it",
  parts: ["module/errors-descriptor", "module/errors-payload"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The error add-on and every reader of the add-on's capture agree here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
