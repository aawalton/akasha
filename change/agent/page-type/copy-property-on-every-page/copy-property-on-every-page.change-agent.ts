import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const copyPropertyOnEveryPage = {
  id: "01a087be-9ba8-777a-a62c-6dd01e0f7e6f",
  type: "page-type/change-agent",
  slug: "copy-property-on-every-page",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "one key's value written under another key on every page of one page type, the first key staying",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath that type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page already with the key written to is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value is written as the body spells that value rather than as text to quote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key written to is put in after the key read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key read from is left where that key is with the value that key has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in holds how many pages the value is written on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed no count writes the value on every page with the key read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count that is no whole number above nothing is refused.",
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
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
