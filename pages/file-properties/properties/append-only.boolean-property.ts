import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const appendOnly = {
  id: "01a09270-0077-7f10-a44b-f637833f8549",
  type: "boolean-property",
  slug: "append-only",
  propertySlug: "append-only",
  definition: "whether a file is only ever added to at its end",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file only added to at its end is never rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying nothing here holds a file that may be rewritten.",
    },
    {
      invariantKind: "departure",
      statement: "What such a file already holds records a moment that has passed.",
    },
    {
      invariantKind: "departure",
      statement: "A path written there was that path when the line naming it was written.",
    },
    {
      invariantKind: "absence",
      statement: "No act rewriting a body reaches such a file.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
