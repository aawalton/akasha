import type { Module } from "@akasha/code-system/module"

export const libSetsTipItemLink = {
  id: "01a06231-8f1e-7646-8b29-68d015b765db",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-item-link",
  definition: "the item link dug out of whatever row control the mouse is over",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The control is recognised by its name for each game window handled.",
    },
    { invariantKind: "departure", statement: "Another addon's row control is reached by name." },
    {
      invariantKind: "departure",
      statement: "A craftable set node yields a link built from the set's first item id.",
    },
  ],
} as const satisfies Module
