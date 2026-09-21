import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const relatedPipeline = {
  id: "01a0c5fc-c478-7997-a120-966993c5a392",
  type: "page-type/module",
  slug: "related-pipeline",
  definition: "the pipeline answering with the pages a set of relations name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page named by id is read by id, and one named by address by slug within its page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages read are the store's, so a page type the store has not acquired answers none.",
    },
  ],
} as const satisfies Module
