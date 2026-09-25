import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const zImageTurbo = {
  id: "01a06553-a9b6-7dda-a90b-f47bdd7d29c8",
  type: "page-type/domain",
  slug: "z-image-turbo",
  definition: "Tongyi's distilled model making an image from text",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The model was trained at 1024 pixels square.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A wide frame doubles a dominant figure once the frame is large.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The doubling comes at 3440 pixels across and not at 2048.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A landscape in the same frame is untouched by the doubling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming the content that fills the width prevents the doubling.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Sharpness falls with the longest edge past 2224 pixels.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "That fall answers the longest edge whatever the frame's area or shape.",
    },
  ],
} as const satisfies Domain
