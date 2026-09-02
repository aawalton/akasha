import type { Module } from "@akasha/code-system/module"

export const hudAddonHideTypes = {
  id: "01a061c5-18dd-700a-803e-9da71e9587ac",
  pageTypeSlug: "module",
  slug: "hud-addon-hide-types",
  definition: "what a request to hide a HUD part states and what the worked-out plan states",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A registration says how to reach its part rather than holding the part.",
    },
    {
      invariantKind: "departure",
      statement: "A plan entry carries the mechanism the catalog gives its part.",
    },
  ],
} as const satisfies Module
