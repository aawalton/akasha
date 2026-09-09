import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const addPropertyToEveryPage = {
  id: "01a08177-a04c-7a4b-9516-1d7be9d3f724",
  pageTypeSlug: "change-agent",
  slug: "add-property-to-every-page",
  changeMode: "change-mode-add",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one value put under one key on every page of one page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pages written are the pages the index names of that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no property under the key is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A key its page type says carries many values is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page is of is refused rather than answered as no edit.",
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
      statement: "Putting the key in is left to the mechanical change adding one key.",
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
    {
      invariantKind: "departure",
      statement: "The value is handed on as the body spells it rather than as text to quote.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
