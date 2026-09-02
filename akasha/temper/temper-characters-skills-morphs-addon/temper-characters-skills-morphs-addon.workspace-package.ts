import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCharactersSkillsMorphsAddon = {
  id: "01a062ff-2792-7da8-8bfd-3a48ace9bf53",
  pageTypeSlug: "workspace-package",
  slug: "temper-characters-skills-morphs-addon",
  definition:
    "the morphs a character has taken, read from the game and shown on that character's tasks",
  manifest: "json",
  partSlugs: [
    "module/skill-morph-strip",
    "module/skill-morph-tracking",
    "module/skill-morph-task-hud",
    "module/skill-morph-task-auto-complete",
    "module/skill-morph-task-progress",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A skill line the game has not shown the character is left unread.",
    },
    {
      invariantKind: "departure",
      statement: "A rank the game reports is taken beside the saved rank and the larger one kept.",
    },
    {
      invariantKind: "departure",
      statement: "A morphed skill is read as having its base at full rank.",
    },
    {
      invariantKind: "departure",
      statement: "Everything here names the game's own numbers rather than akasha ids.",
    },
  ],
} as const satisfies WorkspacePackage
