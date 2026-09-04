import type { Domain } from "../domains/domain.page-type.ts"

export const zImageTurbo = {
  id: "01a06553-a9b6-7dda-a90b-f47bdd7d29c8",
  pageTypeSlug: "domain",
  slug: "z-image-turbo",
  definition: "Tongyi's distilled model making an image from text",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The model was trained at 1024 pixels square.",
    },
    {
      invariantKind: "constraint",
      statement: "A wide frame doubles a dominant figure once the frame is large.",
    },
    {
      invariantKind: "constraint",
      statement: "The doubling comes at 3440 pixels across and not at 2048.",
    },
    {
      invariantKind: "constraint",
      statement: "A landscape in the same frame is untouched by the doubling.",
    },
    {
      invariantKind: "departure",
      statement: "Naming what fills the width prevents the doubling.",
    },
    {
      invariantKind: "constraint",
      statement: "Sharpness falls with the longest edge past 2224 pixels.",
    },
    {
      invariantKind: "constraint",
      statement: "That fall answers the longest edge whatever the frame's area or shape.",
    },
  ],
} as const satisfies Domain
