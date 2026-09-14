import type { ChangeMechanicalPageType } from "akasha/changes/mechanical/page-type/change-mechanical-page-type.page-type.types.ts"

export const removeEveryPageOfAType = {
  id: "01a09cce-a06f-7925-9d95-cd27b5141c4e",
  type: "change-mechanical-page-type",
  slug: "remove-every-page-of-a-type",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page of one page type taken away, each with the files beside it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  guards: [
    "change-guard/claimed-file-not-left-behind",
    "change-guard/import-not-left-hanging",
    "change-guard/relation-not-left-hanging",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page of that page type is answered in this one answer.",
    },
    {
      invariantKind: "departure",
      statement: "The pages taken away are the pages the index names of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A count says the most pages one run of this change takes away.",
    },
    {
      invariantKind: "departure",
      statement: "A count left out takes away every page of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A count below the pages there are takes the first the index names.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the index does not name is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page is of is refused rather than answered as no edit.",
    },
    {
      invariantKind: "departure",
      statement: "The page stating the page type is no page of that type and remains.",
    },
    {
      invariantKind: "departure",
      statement: "A page and every file that page keeps beside the page go together.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which files sit beside a page is read from the index rather than from the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file the page claims and the tree has no body at is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The files beside a page go before that page's own file.",
    },
    {
      invariantKind: "departure",
      statement: "Every entry in a parent's `parts` is dropped before any file goes.",
    },
    {
      invariantKind: "departure",
      statement: "A parent naming a page bare rather than qualified is dropped just the same.",
    },
    {
      invariantKind: "departure",
      statement: "A parent naming two pages that go loses both entries by one edit over it.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change, and the refusal names that page.",
    },
    {
      invariantKind: "departure",
      statement: "Every file goes in this one answer, so no reading comes between two removals.",
    },
    {
      invariantKind: "absence",
      statement: "No rung beneath is reached.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body to find the files beside it.",
    },
  ],
  changeKind: "change-kind/change-mechanical",
} as const satisfies ChangeMechanicalPageType
