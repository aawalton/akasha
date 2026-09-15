import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changePagePagePropertyRelation = {
  id: "01a07932-2568-72d1-a8c7-94da97d53b1e",
  type: "page-type/change-mechanical-file-content",
  slug: "change-page-page-property-relation",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "one relation a page states pointed at another page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which property a key names is read from the index rather than from the key alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key naming no relation is refused here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property naming members is a relation where a member is a relation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page types a value may name are the targets that property declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is resolved by the rule `relation-resolves` judges a landing by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming no page is refused before any body is worked out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value naming more than one page is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body is worked out by `change-page-property` rather than here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No name reaching nothing survives here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page is taken away here.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
