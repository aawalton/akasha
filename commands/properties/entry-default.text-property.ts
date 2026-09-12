import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const entryDefault = {
  id: "01a095ca-f469-7000-9627-eeb375edf870",
  type: "text-property",
  slug: "entry-default",
  propertySlug: "default",
  definition: "what an argument carries under one command where no call says it",
  maxLength: 60,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The default belongs to the command's entry rather than to the argument's page.",
    },
    {
      invariantKind: "departure",
      statement: "One command may default an argument that another command leaves out.",
    },
    {
      invariantKind: "departure",
      statement: "An entry stating one takes it over the default the argument's own page states.",
    },
    {
      invariantKind: "departure",
      statement: "The value is written as a call would say it, and read as a said value is read.",
    },
    {
      invariantKind: "departure",
      statement: "An argument carrying no value states none here.",
    },
    {
      invariantKind: "departure",
      statement: "An entry stating one is always answered, as one a command needs is.",
    },
    {
      invariantKind: "departure",
      statement: "Being always answered, it is never typed undefined for a pair a group forbids.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
