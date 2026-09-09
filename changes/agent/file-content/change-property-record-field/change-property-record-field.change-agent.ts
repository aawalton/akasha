import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const changePropertyRecordField = {
  id: "01a081db-f317-7907-8d05-07fbaed64a3d",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "change-property-record-field",
  changeMode: "change-mode-change",
  definition: "one field of one record a page's many-valued property has, stated anew",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The record worked is named by a field of that record rather than by its place.",
    },
    {
      invariantKind: "departure",
      statement: "A path the world names no page at is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Working the record out is left to the mechanical change of the same name.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-restated",
} as const satisfies ChangeAgent
