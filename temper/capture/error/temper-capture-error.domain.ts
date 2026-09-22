import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCaptureError = {
  id: "01a0608a-15b2-7b81-afe8-cbf9d7803e3f",
  type: "page-type/domain",
  slug: "temper-capture-error",
  definition: "the shape an error raised inside the game takes where the game saves it",
  parts: ["module/errors-descriptor", "module/errors-payload"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The add-on and every reader of the error capture agree here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
} as const satisfies Domain
