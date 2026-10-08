import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const addPageInstants = {
  id: "01a11c09-f1c0-70d7-bac5-cb7ae055a1fc",
  type: "page-type/change-mechanical-page-type",
  slug: "add-page-instants",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "the instants a page was created and last changed, put on every page stating neither",
  takesAtMost: true,
  temporary: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages lack an instant is read from the values the index files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating both instants is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating one instant is given only the other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The instant a page was created is the moment its id was worked out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The instant a page last changed is the last commit git names its path in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page created after it last changed is taken as created when it last changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One batch asks git once for every path that batch writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in bounds how many pages are given instants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This change is deleted once every page states both instants.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
  createdAt: "2026-10-08T15:02:56.191Z",
  updatedAt: "2026-10-08T15:02:56.191Z",
} as const satisfies ChangeMechanicalPageType
