import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const soloDifficulty = {
  id: "01a06031-70e5-71b7-aa04-ac3deb2dfe1c",
  pageTypeSlug: "module",
  slug: "solo-difficulty",
  definition: "how hard one player alone finds a dungeon",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dungeon saying nothing of its difficulty is taken as hard.",
    },
  ],
} as const satisfies Module
