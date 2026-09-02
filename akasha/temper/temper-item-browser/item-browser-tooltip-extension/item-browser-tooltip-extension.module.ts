import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserTooltipExtension = {
  id: "01a06178-3722-761a-a485-c7c7a934b42e",
  pageTypeSlug: "module",
  slug: "item-browser-tooltip-extension",
  definition: "the collection lines this add-on adds under an item's tooltip",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection slot is typed as an id64 here rather than as a number.",
    },
  ],
} as const satisfies Module
