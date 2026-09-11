import type { ChangeAgent } from "../../change-agent.page-type.types.ts"

export const removePropertyFromEveryPage = {
  id: "01a081b9-ad8c-70a8-ab31-382461b45312",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "remove-property-from-every-page",
  changeMode: "change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one key taken off every page of one page type, with the values that key has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no property under the key is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type no page of which holds the key is refused rather than left as no edit.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages the key goes from.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count takes the key from every page holding it.",
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
      statement: "Taking the key out is left to the mechanical change taking one key away.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a required key may go at all is left to that mechanical change.",
    },
    {
      invariantKind: "departure",
      statement: "A page holding no such key is passed over rather than reached at all.",
    },
    {
      invariantKind: "departure",
      statement: "A key mistyped is caught here by the page type with no property under it.",
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
