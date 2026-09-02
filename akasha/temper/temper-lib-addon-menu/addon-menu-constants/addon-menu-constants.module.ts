import type { Module } from "@akasha/code-system/module"

export const addonMenuConstants = {
  id: "01a06100-0000-7000-8000-000000000002",
  pageTypeSlug: "module",
  slug: "addon-menu-constants",
  definition: "the fixed names, sizes, and per-widget version numbers of the library",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each widget type carries its own version number.",
    },
    {
      invariantKind: "constraint",
      statement: "The library version is split into a major string and a minor number.",
    },
    {
      invariantKind: "departure",
      statement: "Dialog identifiers are literal strings rather than generated names.",
    },
  ],
} as const satisfies Module
