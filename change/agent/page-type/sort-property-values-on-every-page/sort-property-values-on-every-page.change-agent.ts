import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const sortPropertyValuesOnEveryPage = {
  id: "01a095a8-fcf7-7a63-8a11-80ee5c1a3025",
  type: "page-type/change-agent",
  slug: "sort-property-values-on-every-page",
  changeMode: "change-mode/change-mode-move",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "the values a key holds carried into the order they sort in, on every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages written are the pages of that page type and of every page type beneath it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose values are already in order is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type no page of which holds the key out of order is answered as no edit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run carries values on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run handed no count carries values on every page holding the key out of order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the page that drew the refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Putting the values in order is left to the mechanical change acting on a page type.",
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
      statement: "Nothing here reads a page's own body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A key holding no list is passed over rather than refused.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
