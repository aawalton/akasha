import type { Module } from "@akasha/code-system/module"

export const hudAddonHideTargets = {
  id: "01a061c5-18dd-7009-859a-31630f29ad1a",
  pageTypeSlug: "module",
  slug: "hud-addon-hide-targets",
  definition: "the shapes a HUD part takes where the way to hide the part is a method of its own",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A shape here holds the one method the mechanism names.",
    },
    {
      invariantKind: "absence",
      statement: "No shape here is a game global.",
    },
  ],
} as const satisfies Module
