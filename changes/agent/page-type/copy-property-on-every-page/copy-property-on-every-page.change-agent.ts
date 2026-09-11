import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const copyPropertyOnEveryPage = {
  id: "01a087be-9ba8-777a-a62c-6dd01e0f7e6f",
  pageTypeSlug: "change-agent",
  type: "change-agent",
  slug: "copy-property-on-every-page",
  changeMode: "change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "one key's value written under another key on every page of one page type, the first key staying",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath that type.",
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
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement:
        "The value is handed on as the body spells that value rather than as text to quote.",
    },
    {
      invariantKind: "departure",
      statement: "The key written to is put in after the key read from.",
    },
    {
      invariantKind: "departure",
      statement: "The key read from is left where that key is with the value that key has.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages the value is written on.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count writes the value on every page with the key read from.",
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
      statement: "Each page is reached over the edits the pages before that page left.",
    },
    {
      invariantKind: "departure",
      statement: "Putting the key in is left to the mechanical change that puts a key in.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each change composed here is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-mechanical",
} as const satisfies ChangeAgent
