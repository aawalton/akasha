import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const movePropertyOnEveryPage = {
  id: "01a0836c-9d39-76b7-bd18-59bab3a21e92",
  type: "page-type/change-agent",
  slug: "move-property-on-every-page",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a key's value written under another key on every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath that type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page's own body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already with the key written to is passed over rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value is written as the body spells that value rather than as text to quote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key written to takes the place the key read from held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key read from goes with the value that key held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages the value is moved on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count moves the value on every page with the key read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal over a page names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits are worked out by the change reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change acts on a page type, as this one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That change is reached through the runner rather than by an import.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
