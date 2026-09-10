import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type BuildCommand = string

export const buildCommand = {
  id: "01a05b26-f8b6-7600-9b5a-4fed2b228f2b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "build-command",
  propertySlug: "build-command",
  definition: "the command run in a web app's source folder to make its build",
  maxLength: 200,
  nameFormat: null,
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
