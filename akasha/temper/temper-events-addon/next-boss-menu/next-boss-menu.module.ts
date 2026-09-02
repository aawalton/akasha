import type { Module } from "@akasha/code-system/module"

export const nextBossMenu = {
  id: "01a06157-835a-76b0-9eb4-90b8d1db3184",
  pageTypeSlug: "module",
  slug: "next-boss-menu",
  definition: "the settings panel a player turns this tracker's parts on and off from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A setting takes effect the moment it changes rather than on the next reload.",
    },
    {
      invariantKind: "departure",
      statement: "What is kept between sessions is read before the panel is built.",
    },
    {
      invariantKind: "departure",
      statement: "The panel names the two authors this tracker was ported from.",
    },
  ],
} as const satisfies Module
