import type { ChangeMechanical } from "../../change-mechanical.page-type.ts"

export const changePagePropertyRelation = {
  id: "01a07932-2568-72d1-a8c7-94da97d53b1e",
  pageTypeSlug: "change-mechanical",
  slug: "change-page-property-relation",
  definition: "one relation a page states pointed at another page",
  code: "ts",
  test: "ts",
  runsChecks: false,
  readersOweReading: false,
  writerOwesReading: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Which property a key names is read from the index rather than from the key alone.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming no relation is refused here.",
    },
    {
      invariantKind: "departure",
      statement: "A property naming members is a relation where a member is a relation.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a value may name are the targets that property declares.",
    },
    {
      invariantKind: "departure",
      statement: "A value is resolved by the rule `relation-resolves` judges a landing by.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming no page is refused before any body is worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming more than one page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The body is worked out by `change-page-property` rather than here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies ChangeMechanical
