import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonHideTargets = {
  id: "01a061c5-18dd-7009-859a-31630f29ad1a",
  type: "page-type/module",
  slug: "hud-addon-hide-targets",
  definition: "the shapes a HUD part takes where the way to hide the part is a method of its own",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape here has the one method the mechanism names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No shape here is a game global.",
    },
  ],
} as const satisfies Module
