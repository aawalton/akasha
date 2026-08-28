import type { Module } from "../code-system/module/module.page-type.ts"

export const corpus = {
  id: "01a04a20-6e04-709a-acbd-c801f7cf7c79",
  pageTypeSlug: "module",
  slug: "corpus",
  definition: "the pages as they stand, addressed by slug and read as a tree",
  code: "ts",
  requiredReadingSlugs: [
    "akasha-page-edge",
    "akasha-file",
  ],
  design: [
    "A page's slug and page type are its filename, so where a page stands is answered without opening it.",
    "A file is a page only where its suffix is a page type slug; a property's file carries a property slug there instead.",
    "A page loaded by the oid of its body cannot go stale, because a page rewritten in one process is a different specifier.",
    "A slug naming nothing is refused where it is resolved, never dropped.",
    "Parenthood is one direction on disk and both in the index.",
  ],
} as const satisfies Module
