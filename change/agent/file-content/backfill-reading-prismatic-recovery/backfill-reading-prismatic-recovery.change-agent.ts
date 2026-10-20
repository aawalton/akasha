import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const backfillReadingPrismaticRecovery = {
  id: "01a15abc-fdbd-774b-9cba-9e81d29bf3b6",
  type: "page-type/change-agent",
  slug: "backfill-reading-prismatic-recovery",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition:
    "every character's readings, with each worn Prismatic Recovery glyph written into the hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A worn jewelry piece whose glyph adds Magicka, Health and Stamina Recovery wears Prismatic Recovery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading is written again only where its hash reads such a piece as no enchant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hash written again is read back and kept only where it reads as the build worn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line written again takes the result its new hash names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This change touches nothing in a reading but its hash and its result.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The change names every reading it wrote again, by character.",
    },
  ],
  changeKind: "change-kind/change-checked",
  maxCpuSeconds: 120,
  maxMemoryMb: 2048,
  createdAt: "2026-10-20T19:14:57.596Z",
  updatedAt: "2026-10-20T19:14:57.596Z",
} as const satisfies ChangeAgent
