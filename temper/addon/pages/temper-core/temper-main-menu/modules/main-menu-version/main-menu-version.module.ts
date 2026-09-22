import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mainMenuVersion = {
  id: "01a0605b-c805-735a-a5cc-35a007da2712",
  type: "page-type/module",
  slug: "main-menu-version",
  definition: "the name and the build number this library answers to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The name here is the name the game loads the addon under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build number rises whenever the published shape changes.",
    },
  ],
} as const satisfies Module
