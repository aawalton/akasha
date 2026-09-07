import type { ChangeRestated } from "../../change-restated.page-type.ts"

export const changePagePropertyText = {
  id: "01a07995-6678-72d8-97ab-a78b836b2f8d",
  pageTypeSlug: "change-restated",
  slug: "change-page-property-text",
  definition: "one text property of one page stated anew in other words",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: false,
  writerOwesReading: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The property a key names is read from the schema the index carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key naming a text property is handed to the mechanical change stating one key anew.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming any other kind of property is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the kind of property the key names.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page's own page type carries no property for is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
} as const satisfies ChangeRestated
