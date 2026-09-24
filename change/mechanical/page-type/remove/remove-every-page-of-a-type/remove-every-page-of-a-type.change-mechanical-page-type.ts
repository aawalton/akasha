import type { ChangeMechanicalPageType } from "akasha/change/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const removeEveryPageOfAType = {
  id: "01a09cce-a06f-7925-9d95-cd27b5141c4e",
  type: "page-type/change-mechanical-page-type",
  slug: "remove-every-page-of-a-type",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page of a page type taken away, each with the files beside it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page of that page type is answered in this one answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages taken away are the pages the index names of that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count says the most pages one run of this change takes away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count left out takes away every page of that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count below the pages there are takes the first the index names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type the index does not name is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no page is of is answered as no edit, saying so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page stating the page type is no page of that type and remains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page and every file that page keeps beside the page go together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which files sit beside a page is read from the index rather than from the folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the page claims and the tree has no body at is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files beside a page go before that page's own file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every entry in a parent's `parts` is dropped before any file goes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent naming a page bare rather than qualified is dropped just the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent naming two pages that go loses both entries by one edit over it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change, and the refusal names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file goes in this one answer, so no reading comes between two removals.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung beneath is reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page's own body to find the files beside it.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
