import type { ChangeMechanicalFileContent } from "../../change-mechanical-file-content.page-type.types.ts"

export const changePagePagePropertyRelation = {
  id: "01a07932-2568-72d1-a8c7-94da97d53b1e",
  pageTypeSlug: "change-mechanical-file-content",
  type: "change-mechanical-file-content",
  slug: "change-page-page-property-relation",
  changeMode: "change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one relation a page states pointed at another page",
  code: "ts",
  test: "ts",
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
    {
      invariantKind: "absence",
      statement:
        "No name reaching nothing survives here, so a guard on what a name reaches finds none.",
    },
    {
      invariantKind: "absence",
      statement:
        "No page is taken away here, so a guard reading what an answer takes away reads nothing.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeMechanicalFileContent
