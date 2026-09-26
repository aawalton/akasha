import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const imageMaking = {
  id: "01a0de88-e9b3-7616-a60d-aff90fbbcc61",
  type: "page-type/module",
  slug: "image-making",
  definition: "the values an image states of the run that made it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The values are worked out from what a run was asked, and never from the host.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A size, a count or a text the run was not asked is left unstated.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The quantizing a service stated among its versions is stated as its own value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each version is the package's name in kebab case, a space, then its version.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An input or reference image is named by its image page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An input or reference image no image page has is left unstated.",
    },
  ],
} as const satisfies Module
