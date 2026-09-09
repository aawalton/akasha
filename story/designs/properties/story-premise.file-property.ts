import type { FileProperty } from "@akasha/pages/file-property"

export type StoryPremise = "md"

export const storyPremise = {
  id: "01a06577-f385-7179-9713-a0ebc7944548",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "story-premise",
  propertySlug: "premise",
  definition: "what a story is about, in the shape the story is told in",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A premise is a document beside its design rather than a line in the design.",
    },
    {
      invariantKind: "departure",
      statement: "A premise is written in the shape the story it opens is told in.",
    },
  ],
} as const satisfies FileProperty
