import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const markersTextures = {
  id: "01a0de85-2b4c-7215-b37e-4f811ffaacc7",
  type: "page-type/module",
  slug: "markers-textures",
  definition: "the textures a marker may carry and the paths they are drawn from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A marker names its texture by the path More Markers names it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A texture under More Markers' folder is drawn from this add-on's own folder.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A built-in texture is shared by its place in this list, as More Markers shares it.",
    },
  ],
} as const satisfies Module
