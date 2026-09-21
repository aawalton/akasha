import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const persistImage = {
  id: "01a0685d-4b35-7013-8853-9ed4e36a99e3",
  type: "page-type/module",
  slug: "persist-image",
  definition: "the image page a generate, edit or upscale run lands, with the bytes beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a generate or edit or upscale run lands an image.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page is landed by naming it to the pages service, which places it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bytes are written beside the path the page is read back at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture whose page is already there gets its bytes placed and no second page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page landed and the bytes placed are each pushed into the caller's `done`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The bytes are written on the workstation, where the checkout the pages service reads is.",
    },
  ],
} as const satisfies Module
