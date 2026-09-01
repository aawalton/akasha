import type { TextProperty } from "@akasha/pages-system/text-property"

export type BuildCommand = string

export const buildCommand = {
  id: "01a05b26-f8b6-7600-9b5a-4fed2b228f2b",
  pageTypeSlug: "text-property",
  slug: "build-command",
  propertySlug: "build-command",
  definition: "the command run in a web app's source folder to make its build",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The command is run in the folder the source directory names.",
    },
    {
      invariantKind: "departure",
      statement:
        "The command is stated on the page rather than written into the code that runs the command.",
    },
  ],
} as const satisfies TextProperty
