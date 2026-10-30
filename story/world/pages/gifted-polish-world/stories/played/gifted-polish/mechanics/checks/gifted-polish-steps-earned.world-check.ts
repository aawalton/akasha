import type { WorldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.types.ts"

export const giftedPolishStepsEarned = {
  id: "01a18e17-127d-7301-b9c9-b91f37071659",
  type: "page-type/world-check",
  slug: "gifted-polish-steps-earned",
  title: "Steps Earned",
  world: "world/gifted-polish-world",
  definition: "what an Achievement, a Path completed or a real deed earns Nala's Paths, in steps",
  description:
    "Steps a Path earns outside practice, from an Achievement, a Path completed, or doing a thing for real.",
  settledBy: "world-check/gifted-reborn-steps-earned",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One settling pays every Path a turn earns steps on outside practice, and rolls no dice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'The reading is `{"earned":[<entry>, ...]}`, with `"talented"` or `"gifted"` where she holds one.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'An entry is `{"path":"character-skill/<held path>","experience":<steps held>}` and its earning.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'A real deed\'s entry adds `"deed":<steps>`, the steps the game master judges it worth.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'An Achievement\'s entry adds `"achievement":{"basic":<steps>}`, its offer for each kind.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An Achievement's entry names the Path she chose, and earns the steps offered its kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An Achievement offering nothing for a Path's kind is refused for that Path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mutated Path takes no Achievement steps, so Soulstealing is refused one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The Completionist is an Advanced Path, so it takes an Achievement's Advanced steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        'A Path completed adds `"completed":"basic"` or `"elite"` to the Completionist\'s entry.',
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A Path completed pays the Completionist 10 steps for a Basic Path and 40 for an Elite, sped.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No Advanced Path completed has a number in the source, so `completed` takes none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Completionist takes no deed, and no other Path takes a Path completed.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "Talented speeds every entry by a fifth of its value in percent, and Gifted by two fifths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sped entry falls to the whole step below.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That fits Gifted 159 and 187 paying 163 and 174 for 100, in `gifted-0078` and `gifted-0095`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The extra steps an Achievement adds to the Path of Exceptionalism are not sped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Path of Exceptionalism is not listed until it opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deed earns more for real risk and for a new feat, and nothing for the same feat again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Sped deeds in the source run from 12 steps for a first break-in to 150 for one infiltration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Path set aside earns no steps, so an entry naming one is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Path is named once in a reading, and a Path named twice is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Basic Path's Tiers pay as practice pays them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Completionist's first and second Tiers pay 3 Unallocated Stats each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other Tier's reward is told by the game master, as the lore states it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names each crossing `<Path> Tier <n>`.",
    },
  ],
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldCheck
