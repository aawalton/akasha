import type { ChangeMechanicalFileContent } from "akasha/change/mechanical/file-content/change-mechanical-file-content.page-type.types.ts"

export const changePagePagePropertyRelation = {
  id: "01a07932-2568-72d1-a8c7-94da97d53b1e",
  type: "page-type/change-mechanical-file-content",
  slug: "change-page-page-property-relation",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content-page-property-value",
  definition: "a relation a page states pointed at another page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which property a key names is read from the index rather than from the key alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming no relation is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming members is a relation where a member is a relation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types a value may name are the targets that property declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is resolved by the rule `relation-resolves` judges a landing by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming no page is refused before any body is worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming more than one page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body is worked out by `change-page-property` rather than here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No name reaching nothing survives here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is taken away here.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalFileContent
