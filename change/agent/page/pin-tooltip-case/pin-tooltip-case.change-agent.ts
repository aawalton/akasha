import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const pinTooltipCase = {
  id: "01a15c22-e9f4-758e-a4ea-388bbbfdd74f",
  type: "page-type/change-agent",
  slug: "pin-tooltip-case",
  changeMode: "change-mode/change-mode-add",
  changeTargetType: "change-target-type/file",
  changeTargetSubtype: "change-target-subtype/file",
  definition: "a tooltip case page, pinned from one line of a character's readings",
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
      statement:
        "The case keeps the line's stats and each slotted skill's tooltip and duration, in slot order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The case keeps the passives, stars, medium pieces and bar's weapons the line's build hash holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The case keeps the line's active buffs and its War Mage and Mighty points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The case keeps the Healing Done Temper works out for the line's build and buffs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The case is pinned against the equations the skill pages keep on disk.",
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
      statement: "A reading that records no game version or keeps no slotted skill is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change reaches no mechanical change.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 1024,
  createdAt: "2026-10-21T01:45:54.419Z",
  updatedAt: "2026-10-21T06:14:58.367Z",
} as const satisfies ChangeAgent
