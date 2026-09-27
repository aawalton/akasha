import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsLiveness = {
  id: "01a060cd-5651-794e-9cb4-d37959543fd2",
  type: "page-type/module",
  slug: "errors-liveness",
  definition: "whether an error is still happening or was left behind",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An error unseen for longer than the staleness allowed is left behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit to an error's addon is no mend of that error.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
