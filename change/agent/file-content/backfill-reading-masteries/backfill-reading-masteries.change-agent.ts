import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const backfillReadingMasteries = {
  id: "01a15eb8-e295-7597-926b-064bdd5de026",
  type: "page-type/change-agent",
  slug: "backfill-reading-masteries",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition:
    "every reading and stat case, with the class masteries its reading holds written into the hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading's class masteries are the mastery pages whose ability its class passives name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading holding a class mastery is written again at minor fourteen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading holding no class mastery is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stat case takes the masteries of the reading of its character captured at its instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hash written again is read back and kept only where it reads as the build with its masteries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line written again takes the result its new hash names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change touches nothing in a reading or a stat case but its hash and result.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change names every reading and stat case it wrote again.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 2048,
  createdAt: "2026-10-21T13:48:57.365Z",
  updatedAt: "2026-10-21T13:48:57.365Z",
} as const satisfies ChangeAgent
