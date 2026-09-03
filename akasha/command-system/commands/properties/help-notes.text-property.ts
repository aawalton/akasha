import type { TextProperty } from "@akasha/pages-system/text-property"

export type HelpNotes = string

export const helpNotes = {
  id: "01a0503a-e9d3-7871-a992-1d4e1e22d792",
  pageTypeSlug: "text-property",
  slug: "help-notes",
  propertySlug: "help-notes",
  definition: "one line a command's help says past the list of what it takes",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The lines stand in the order the lines are written.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are shown under the list of what a command takes.",
    },
    {
      invariantKind: "departure",
      statement: "What one thing a command takes is for stands beside that thing rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "A line carries no example.",
    },
    {
      invariantKind: "absence",
      statement: "A line holds nothing generated.",
    },
  ],
} as const satisfies TextProperty
