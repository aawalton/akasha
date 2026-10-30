import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const landKeybindings = {
  id: "01a1847e-2488-7c40-a411-1dffc5c416ac",
  type: "page-type/change-agent",
  slug: "land-keybindings",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/page",
  changeTargetSubtype: "change-target-subtype/page",
  definition: "a change that writes the keybindings the game holds to their pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The capture is handed in as the JSON of the keybinder's user profile table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The instant handed in is when a shared action with no capture of its own changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What lands is what the watcher lands from the same capture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run over the pages a run wrote writes nothing.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 30,
  maxMemoryMb: 3072,
  createdAt: "2026-10-28T21:50:21.831Z",
  updatedAt: "2026-10-30T17:25:19.224Z",
} as const satisfies ChangeAgent
