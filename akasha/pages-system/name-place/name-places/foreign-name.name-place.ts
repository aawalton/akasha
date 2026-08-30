import type { NamePlace } from "../name-place.page-type.ts"

export const foreignName = {
  id: "01a04feb-819f-7c88-a837-385bf1c6a294",
  pageTypeSlug: "name-place",
  slug: "foreign-name",
  definition: "a name whose owner stands outside akasha",
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A name is its owner's where renaming it would break what reads it outside akasha.",
    },
    {
      invariantKind: "departure",
      statement:
        "An owner is a tool looking for the name or a language spelling it or an engine loading it or a generator writing it.",
    },
    {
      invariantKind: "departure",
      statement: "A name its owner spells is judged by no format here.",
    },
    {
      invariantKind: "departure",
      statement: "Akasha never states that format.",
    },
    {
      invariantKind: "departure",
      statement: "That format is the owner's to change.",
    },
    {
      invariantKind: "departure",
      statement: "This licenses a name rather than a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A name standing beside one its owner spells still answers the test alone.",
    },
  ],
} as const satisfies NamePlace
