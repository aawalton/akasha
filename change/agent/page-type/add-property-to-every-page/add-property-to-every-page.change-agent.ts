import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

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
      invariantKind: "invariant-kind/departure",
      statement: "The pages written are the pages the index names of that page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type with no property under the key is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key its page type says carries many values is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type no page is of is refused rather than answered as no edit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value that parses as no value is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value is written as the caller spells it rather than as text to quote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key is put in where the pages of that page type write that key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An `after` the caller states places the key on every page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the index files no value for gains the key last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal over a page names that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change acts on a page type, as this one does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
