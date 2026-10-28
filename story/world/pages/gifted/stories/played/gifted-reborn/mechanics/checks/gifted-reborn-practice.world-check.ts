import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedRebornPractice = {
  id: "01a17ff1-398f-73e3-bd7e-a87a31f93187",
  type: "page-type/world-check",
  slug: "gifted-reborn-practice",
  title: "Practice",
  world: "world/gifted",
  definition: "what one session of practice earns one of Nala's Basic Paths",
  description: "How far a stretch of practice carries one of Nala's Basic Paths.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One session is fifteen minutes of practice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One session rolls one six-sided die, with `--dice 1d6`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session earns the die's total in steps on the Path practised.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Path she knew in her past life earns two steps more each session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Basic Numeracy and Linguistics - English are the Paths she knew in her past life.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Tier a session passes adds a point to the Attribute its Path trains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Practice opens a Path she holds but has not opened, and is not refused for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crossing is named `<Path> Tier <n>`, so a montage can stop after one.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No session leaves the routine of itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"path":"character-skill/<held path>","experience":<steps held>}`.',
    },
  ],
  createdAt: "2026-10-28T00:37:57.775Z",
  updatedAt: "2026-10-28T00:37:57.775Z",
} as const satisfies WorldCheck
