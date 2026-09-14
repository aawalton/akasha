import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const copyPropertyOnEveryPage = {
  id: "01a087be-9ba8-777a-a62c-6dd01e0f7e6f",
  type: "change-agent",
  slug: "copy-property-on-every-page",
  changeMode: "change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "one key's value written under another key on every page of one page type, the first key staying",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath that type.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's own body.",
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
      statement: "The value is written as the body spells that value rather than as text to quote.",
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
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
