import type { ChangePartial } from "../../change-partial.page-type.ts"

export const restateValue = {
  id: "01a0769d-4e44-775a-ab97-c8a7943bbefc",
  pageTypeSlug: "change-partial",
  slug: "restate-value",
  definition: "one key of a page's exported object stated anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The keys read are the exported object's own rather than every key the body holds.",
    },
    {
      invariantKind: "departure",
      statement: "The first exported object literal in the body is the page's.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page states no text under is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key stating what was asked for already is refused.",
    },
    {
      invariantKind: "departure",
      statement: "One key is restated and the rest of the body is left as it is.",
    },
    {
      invariantKind: "departure",
      statement: "The text is written back quoted rather than spliced in bare.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether that key may be restated, which is the caller's.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or an index.",
    },
  ],
} as const satisfies ChangePartial
