import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const movePropertyOnEveryPage = {
  id: "01a0836c-9d39-76b7-bd18-59bab3a21e92",
  pageTypeSlug: "change-agent",
  slug: "move-property-on-every-page",
  changeMode: "change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one key's value written under another key on every page of one page type",
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
      statement:
        "Which pages have the key is read from the values the index files for each page type.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read to find out which pages have the key.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page already with the key written to is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A list of one becomes one value where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement: "A list of more than one is refused where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement: "The value is handed on as the body spells it rather than as text to quote.",
    },
    {
      invariantKind: "departure",
      statement: "The key written to is put in after the key read from.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages the value is moved on.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count moves the value on every page with the key read from.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no whole number above nothing is refused.",
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
      statement:
        "Putting the key in and taking the key out are left to the mechanical changes doing each.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each change this one composes is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKindSlug: "change-checked",
} as const satisfies ChangeAgent
