import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zimageExploreBatch = {
  id: "01a06815-9efd-702b-918e-4790e2c76682",
  type: "page-type/module",
  slug: "zimage-explore-batch",
  definition: "a batch of prompt files rendered one after another",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A graph is posted straight at the daemon rather than through the command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A prompt file names the image the render of that file lands as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seed a render was drawn with is written beside the image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A render answering no image before the deadline ends the batch.",
    },
  ],
} as const satisfies Module
