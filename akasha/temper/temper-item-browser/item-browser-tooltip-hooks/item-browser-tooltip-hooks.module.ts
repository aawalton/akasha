import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserTooltipHooks = {
  id: "01a06178-3722-7072-929f-386663022358",
  pageTypeSlug: "module",
  slug: "item-browser-tooltip-hooks",
  definition: "the game tooltips this add-on attaches its extra lines to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An argument of an unknown kind is narrowed where it is read rather than by a helper.",
    },
  ],
} as const satisfies Module
