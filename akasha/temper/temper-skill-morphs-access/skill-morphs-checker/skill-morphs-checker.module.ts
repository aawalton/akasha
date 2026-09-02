import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillMorphsChecker = {
  id: "01a061e2-5e38-77dc-9add-14ce77dbae86",
  pageTypeSlug: "module",
  slug: "skill-morphs-checker",
  definition: "whether a character has every morph of every line that character can use",
  code: "ts",
} as const satisfies Module
