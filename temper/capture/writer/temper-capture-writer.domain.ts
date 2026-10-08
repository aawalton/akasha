import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCaptureWriter = {
  id: "01a060b5-5ba6-79b3-9194-4261a9b83de6",
  type: "page-type/domain",
  slug: "temper-capture-writer",
  definition: "the add-on side of a capture, where the game is asked to save what was taken",
  parts: [
    "module/account-wide-vars",
    "module/capture-writer",
    "module/run-batched",
    "module/function-answers",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An add-on states the capture in a descriptor and nothing more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture is saved for the whole account rather than for one character.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This code is compiled to Lua and runs inside the game.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a saved file back.",
    },
  ],
  createdAt: "2026-09-02T06:01:33.350Z",
  updatedAt: "2026-09-24T22:10:41.000Z",
} as const satisfies Domain
