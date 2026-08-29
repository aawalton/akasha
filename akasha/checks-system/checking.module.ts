import type { Module } from "../code-system/module/module.page-type.ts"

export const checking = {
  id: "01a04b5e-39e5-7d6d-b739-03ea2da3b1cd",
  pageTypeSlug: "module",
  slug: "checking",
  definition: "every check gathered and run over one change, answering what refuses it",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["page-type/check", "module/corpus", "module/judging"],
  design: [
    "A check and its page cannot drift apart, because the page names the export.",
    "A check that needs a path or a file is run over what the change touched; a check that needs the tree is run over the tree the change would leave.",
    "The tree a check is shown is the one the change would leave, never the one on disk.",
    "A check needing files it can load asks for the tree to be kept, and is handed a folder holding the change.",
    "A tree is kept once for the run that asked, and only where a check asked.",
    "A check that threw refuses the change it could not judge.",
  ],
} as const satisfies Module
