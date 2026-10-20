import type { ChangeAgent } from "akasha/change/agent/change-agent.page-type.types.ts"

export const backfillReadingLevels = {
  id: "01a15a81-179d-70bf-98d4-df70aa63fc50",
  type: "page-type/change-agent",
  slug: "backfill-reading-levels",
  changeMode: "change-mode/change-mode-change",
  changeTargetType: "change-target-type/file-content",
  changeTargetSubtype: "change-target-subtype/file-content",
  definition:
    "every character's readings, with each piece's level its links say written into the hash",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading hashed before minor thirteen is written again at minor thirteen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each piece takes the item level and glyph level its worn piece says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A level-fifty subtype is placed by the items every account's stacks hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading wearing a piece no item places is named, and that piece's level left unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a reading wearing a piece below CP160 or a glyph below fifty is written again.",
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
  createdAt: "2026-10-20T18:09:32.060Z",
  updatedAt: "2026-10-20T18:14:28.432Z",
} as const satisfies ChangeAgent
