import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedRebornPractice = {
  id: "01a17ff1-398f-73e3-bd7e-a87a31f93187",
  type: "page-type/world-check",
  slug: "gifted-reborn-practice",
  title: "Practice",
  world: "world/gifted",
  definition: "what one session of practice earns one of Nala's Basic Paths",
  description: "Practising what a Path rewards, counted in steps.",
  settling: {},
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One session is fifteen minutes of practice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One session rolls one four-sided die, with `--dice 1d4`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session earns the die's total in steps on the Path practised.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Path she knew in her past life earns three steps more each session.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That rate fits `gifted-0002-chapter-1`, two past-life Paths passing 8000 steps in four months.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "It fits `gifted-0005-chapter-4` too, three new Paths gaining about 30 steps a day each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading may state `talented` or `gifted`, the one of them she holds, and never both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Talented speeds a session by a fifth of its value in percent, and Gifted by two fifths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sped session rounds to the nearest step, so so few steps keep their speed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No Affinity, teacher or novelty moves a session, since the source gives none a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Basic Numeracy and Linguistics - English are the Paths she knew in her past life.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each Tier adds a point to its Path's Attribute; the ninth adds an Unallocated Stat, the tenth two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Practice opens a Path she holds but has not opened, and is not refused for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Path she has set aside earns no steps, so practising it is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That rule is the Gifted chapter `gifted-0015-chapter-14` at line 97.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Cornelius gaining Tiers on a dormant Path, `gifted-0061-chapter-60` line 25, is his alone.",
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
  updatedAt: "2026-10-28T14:07:02.023Z",
} as const satisfies WorldCheck
