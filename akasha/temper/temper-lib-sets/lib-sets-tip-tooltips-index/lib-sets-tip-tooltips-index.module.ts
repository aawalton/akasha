import type { Module } from "@akasha/code-system/module"

export const libSetsTipTooltipsIndex = {
  id: "01a0623c-2df7-7095-810c-642dbebff290",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-tooltips-index",
  definition: "the order the tooltip modules are loaded in",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
    {
      invariantKind: "constraint",
      statement: "The hook module loads after every module whose slots the hook module reads.",
    },
  ],
} as const satisfies Module
