import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const removeEveryPageOfAType = {
  id: "01a081bd-2930-7f0d-9324-5412a477c845",
  pageTypeSlug: "change-agent",
  slug: "remove-every-page-of-a-type",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page of one page type taken away, each with the files beside it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages taken away are the pages the index names of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A count says the most pages one reach of this change takes away.",
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
      statement: "A count above the pages there are takes every page.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The caller reaches this change again to take away the pages a count left.",
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
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is reached over the edits the pages before it left.",
    },
    {
      invariantKind: "departure",
      statement: "Taking one page away is left to the mechanical change taking a page away.",
    },
    {
      invariantKind: "departure",
      statement: "The order the files of one page go in is left to that mechanical change.",
    },
    {
      invariantKind: "departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
