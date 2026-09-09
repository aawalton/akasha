import type { TextProperty } from "@akasha/pages/text-property"

export type HelpNotes = string

export const helpNotes = {
  id: "01a0503a-e9d3-7871-a992-1d4e1e22d792",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "help-notes",
  propertySlug: "help-notes",
  definition: "one line a command's help says past the list of what it takes",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The lines are in the order the lines are written.",
    },
    {
      invariantKind: "departure",
      statement: "The lines are shown under the list of a command's arguments.",
    },
    {
      invariantKind: "departure",
      statement:
        "The purpose of one thing a command takes sits beside that thing rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "A line has no example.",
    },
    {
      invariantKind: "absence",
      statement: "A line has nothing generated.",
    },
  ],
} as const satisfies TextProperty
