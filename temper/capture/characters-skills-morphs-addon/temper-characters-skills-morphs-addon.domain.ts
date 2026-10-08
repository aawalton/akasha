import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperCharactersSkillsMorphsAddon = {
  id: "01a062ff-2792-7da8-8bfd-3a48ace9bf53",
  type: "page-type/domain",
  slug: "temper-characters-skills-morphs-addon",
  definition:
    "the morphs a character has taken, read from the game and shown on that character's tasks",
  parts: [
    "module/skill-morph-strip",
    "module/skill-morph-task-hud",
    "module/skill-morph-task-progress",
    "module/skill-morph-tracking",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line the game has not shown the character is left unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rank the game reports is taken beside the saved rank and the larger rank kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A morphed skill is read as having its base at full rank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything here names the game's own numbers rather than akasha ids.",
    },
  ],
  createdAt: "2026-09-02T16:41:24.114Z",
  updatedAt: "2026-09-21T15:13:32.000Z",
} as const satisfies Domain
