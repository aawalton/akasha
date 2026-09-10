import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const changePagePagePropertyText = {
  id: "01a07995-6678-72d8-97ab-a78b836b2f8d",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "change-page-page-property-text",
  changeMode: "change-mode-change",
  definition: "one text property of one page stated anew in other words",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The property a key names is read from the schema the index has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key naming a text property is handed to the mechanical change stating one key anew.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming a page type that extends a text property is handed on the same way.",
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
      statement: "A key the page's own page type has no property for is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-restated",
} as const satisfies ChangeAgent
