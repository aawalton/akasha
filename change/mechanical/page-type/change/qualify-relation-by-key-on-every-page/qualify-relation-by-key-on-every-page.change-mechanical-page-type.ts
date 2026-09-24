import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const qualifyRelationByKeyOnEveryPage = {
  id: "01a0d3f7-c9d4-7a8e-96bb-538a5b92e2f0",
  type: "page-type/change-mechanical-page-type",
  slug: "qualify-relation-by-key-on-every-page",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a bare name written anew with the page stating it under a key, on every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page a bare name reaches is the page of the target stating that name under `by`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The target is handed in rather than read off what the field declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name two target pages state under `by` refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no target page states refuses the whole change, naming the file it is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The key names entries kept in a file beside the page, and every part of it is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The field is a path of keys joined by dots, walked down each row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list met on that path has each of its members walked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name already stating its page type is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no row of which names a page by a bare name is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the property's declaration.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value in a page's own body is written.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
