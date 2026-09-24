import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const copyEntryKeyOnEveryPage = {
  id: "01a0d506-39ae-7484-9ccc-ac3553bf99ac",
  type: "page-type/change-agent",
  slug: "copy-entry-key-on-every-page",
  changeMode: "change-mode/change-mode-add-if-not-present",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page-property",
  definition:
    "a key's value written under another key in every entry beside every page of a page type",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The run names the page type, the key its entries sit under, and the two keys inside each entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count handed in holds how many pages one run writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One entry refused refuses the whole change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing the key is left to the mechanical change acting on a page type.",
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
