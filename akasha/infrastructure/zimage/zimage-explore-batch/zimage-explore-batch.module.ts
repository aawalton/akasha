import type { Module } from "@akasha/code-system/module"

export const zimageExploreBatch = {
  id: "01a06815-9efd-702b-918e-4790e2c76682",
  pageTypeSlug: "module",
  slug: "zimage-explore-batch",
  definition: "a batch of prompt files rendered one after another",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A graph is posted straight at the daemon rather than through the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt file names the image the render of that file lands as.",
    },
    {
      invariantKind: "departure",
      statement: "The seed a render was drawn with is written beside the image.",
    },
    {
      invariantKind: "departure",
      statement: "A render answering no image before the deadline ends the batch.",
    },
  ],
} as const satisfies Module
