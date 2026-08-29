import type { Module } from "../code-system/module/module.page-type.ts"

export const checking = {
  id: "01a04bc4-7e86-7df4-a322-36cc3b789fce",
  pageTypeSlug: "module",
  slug: "checking",
  definition: "every check gathered and run over one change, answering what refuses it",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [],
  design: [
    "A check and its page cannot drift apart, because the page names the export.",
    "The checks are found in the index, so finding them costs nothing the corpus grows.",
    "A check is run once for each changed file it was given, and never once for the corpus.",
    "A check that threw refuses the change it could not judge.",
    "Audit is the same run over every page the index knows, so no phase walks the tree.",
  ],
} as const satisfies Module
