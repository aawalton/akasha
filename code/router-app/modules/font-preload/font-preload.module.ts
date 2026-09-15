import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fontPreload = {
  id: "01a090ec-d6a6-7002-aecb-89687607f4b5",
  type: "module",
  slug: "font-preload",
  definition: "the link a root document carries to fetch a font before the page is drawn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A font is fetched without credentials.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The font a root preloads is the address handed in rather than one named here.",
    },
  ],
} as const satisfies Module
