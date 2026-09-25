import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonTextureNames = {
  id: "01a0d9a7-dede-762a-a5d2-ff4aa330ec52", type: "page-type/module",
  slug: "addon-texture-names",
  definition: "the texture paths an add-on's code and markup name",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture is a quoted path ending in the game's texture extension.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path filled in or joined on as the add-on runs is set apart rather than judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name the code binds once to fixed text is filled into a path, which is then judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name bound more than once, or read off a field, leaves its path set apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The texture extension quoted alone names no texture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under the game's interface or engine art folder is the game's own texture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other path names its add-on by its first folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is compared in lower case with forward slashes, as the game compares it.",
    },
  ],
} as const satisfies Module
