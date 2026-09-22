import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const removeEveryPageOfAType = {
  id: "01a081bd-2930-7f0d-9324-5412a477c845",
  type: "page-type/change-agent",
  slug: "remove-every-page-of-a-type",
  changeMode: "change-mode/change-mode-remove",
  changeTargetType: "change-target-type/page-type",
  changeTargetSubtype: "change-target-subtype/page-type-page",
  definition: "every page of a page type taken away, each with the files beside it",
  takesAtMost: true,
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is handed to the mechanical change taking every page of one away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page of that page type is that change's one answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count is handed on and bounds how many pages that change takes away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count left out takes away every page of that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that is no whole number above nothing is refused here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller reaches this change again to take away the pages a count left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal from that change is the refusal this act gives.",
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
    {
      decisionKind: "decision-kind/absence",
      statement: "No change but that one rung is reached.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 3072,
} as const satisfies ChangeAgent
