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
    {
      decisionKind: "decision-kind/departure",
      statement: "Alan disprefers heavy subjects, large chests and Black subjects in a render.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Beyond Reality 3 draws a woman busty unless the prompt states a small chest.",
    },
  ],
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Alan Reviews",
      act: "Hand Alan every render his request made, without reviewing or re-rendering any of it.",
      warrant:
        "Alan judges what he wants, and a render swapped out on your judgment hides one he might pick.",
      aids: ["A render that missed his prompt is still his to judge."],
    },
  ],
  createdAt: "2026-09-26T15:59:15.411Z",
  updatedAt: "2026-10-12T12:47:55.371Z",
} as const satisfies Domain
