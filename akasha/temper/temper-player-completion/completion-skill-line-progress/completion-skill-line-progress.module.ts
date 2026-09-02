import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionSkillLineProgress = {
  id: "01a06279-3a00-7001-abfa-2b87b8b01e4e",
  pageTypeSlug: "module",
  slug: "completion-skill-line-progress",
  definition: "how far each character has taken every skill line, and the morphs alongside",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A skill line at its last rank reads as a hundred.",
    },
    {
      invariantKind: "constraint",
      statement: "A skill line the game gives no rank ceiling is left out.",
    },
  ],
} as const satisfies Module
