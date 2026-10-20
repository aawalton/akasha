import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const pinStatCase = {
  id: "01a13b71-0505-7295-b80f-664bb22fb765",
  type: "page-type/change-agent",
  slug: "pin-stat-case",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a stat case page, pinned from one line of a character's readings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The character is handed in by its page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The case is pinned from one line of that character's readings.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is picked by when it was captured or by the start of its line's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "With no reading picked, the case is pinned from the newest line of the bar handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bar is handed in as front or back, and narrows a pick to that bar's lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The case takes its bar and its build hash from the line it is pinned from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Buffs and champion points a line keeps keyed by number are pinned as lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pick matching no line, or more than one, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case handed no slug is named for its character, its bar and when it was read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug some case is named already is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading that records no game version is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The case keeps the Ultimate the line held, where the line kept it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The case pins each Advanced Stats row the line keeps under the stat whose page names that row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat stat-compare calls unsettled is neither pinned nor kept as a gap.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-14T17:23:45.028Z",
  updatedAt: "2026-10-20T16:43:30.990Z",
} as const satisfies ChangeAgent
