import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removeEntryKeyOnEveryPage = {
  id: "01a0d51c-fc11-72a1-851f-dd89635ae3c5",
  type: "page-type/change-agent",
  slug: "remove-entry-key-on-every-page",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition: "a key taken out of every entry beside every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run names the page type, the key its entries sit under, and the key taken out of each entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run may name the key that must already hold the value taken out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the key out is left to the mechanical change acting on a page type.",
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
