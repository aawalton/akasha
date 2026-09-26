import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const imageGeneration = {
  id: "01a0de71-31d3-7a7e-babe-d9b9e8b40168",
  type: "page-type/domain",
  slug: "image-generation",
  definition: "how a service is used to make a new picture",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Beyond Reality 3, a Z-Image Turbo finetune, is the model that makes a picture.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Stock Z-Image Turbo makes a worse picture than Beyond Reality 3.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The zi-pornmaster-v1 LoRA misplaces limbs more often than Beyond Reality 3 alone.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Big Love ZT3 makes a less pretty picture than Beyond Reality 3.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Z-Image Base times out on the MacBook.",
    },
  ],
} as const satisfies Domain
