import type { ChangeAgent } from "akasha/changes/agent/change-agent.page-type.types.ts"

export const movePropertyOnEveryPage = {
  id: "01a0836c-9d39-76b7-bd18-59bab3a21e92",
  type: "change-agent",
  slug: "move-property-on-every-page",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "one key's value written under another key on every page of one page type",
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
      statement: "The key written to takes the place the key read from held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key read from goes with the value that key held.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in holds how many pages the value is moved on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed no count moves the value on every page with the key read from.",
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
