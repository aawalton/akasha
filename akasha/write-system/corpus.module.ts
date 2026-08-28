import type { Module } from "../code-system/module/module.page-type.ts"

export const corpus = {
  id: "01a04a20-6e04-709a-acbd-c801f7cf7c79",
  pageTypeSlug: "module",
  slug: "corpus",
  definition: "the pages as they are on disk, addressed by slug and read as a tree",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: [
    "akasha-page-edge",
    "akasha-file",
    "part-slugs",
  ],
  design: [
    "A slug is unique among the pages of its page type, so a slug alone is not an address.",
    "A slug is answered through the relation that names it: the relation's target narrows it, and where it narrows to more than one the answer is a refusal naming each.",
    "A page is held by its path, which is unique, and addressed by its slug, which is not.",
    "A page is loaded synchronously, which is safe only because a page's module does nothing when loaded but declare its value.",
    "A corpus answers from a source it is given, so what supplies the answers can change without anything above it noticing.",
    "A page's slug and page type are its filename, so where a page lives is answered without opening it.",
    "A file is a page only where its suffix is a page type slug; a property's file carries a property slug there instead.",
    "A page loaded by the oid of its body cannot go stale, because a page rewritten in one process is a different specifier.",
    "A slug naming nothing is refused where it is resolved, never dropped.",
    "Pages are ordered by path, so a refusal naming two candidates words them the same way every run.",
  ],
} as const satisfies Module
