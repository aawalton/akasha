import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const addPropertyToEveryPage = {
  id: "01a08177-a04c-7a4b-9516-1d7be9d3f724",
  type: "change-agent",
  slug: "add-property-to-every-page",
  changeMode: "change-mode/change-mode-add",
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
      statement: "A value that parses as no value is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The value is written as the caller spells it rather than as text to quote.",
    },
    {
      invariantKind: "departure",
      statement: "The key is put in where the pages of that page type write that key.",
    },
    {
      invariantKind: "departure",
      statement: "An `after` the caller states places the key on every page.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index files no value for gains the key last.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal over a page names that page.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      invariantKind: "departure",
      statement: "That change acts on a page type, as this one does.",
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
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
