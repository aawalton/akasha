import type { Module } from "@akasha/code-system/module"

export const pageFileBody = {
  id: "01a07323-6246-7319-bab0-db087f92380d",
  pageTypeSlug: "module",
  slug: "page-file-body",
  definition: "the body a page keeps in a file beside the page under one file property",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property whose page type is `file-property` keeps its body beside the page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file's name is the page's name followed by the property's slug and the ending stated.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read only for a key the caller asks for by name.",
    },
    {
      invariantKind: "departure",
      statement: "A caller asking for no key reads no file.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming no file property is left as the ending that key states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the page names that is not there is refused rather than read as holding nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body read here is answered in place of the ending stated.",
    },
    {
      invariantKind: "departure",
      statement: "A property's body may be kept in the numbered files beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "The numbered files of one property are joined in the order they are numbered.",
    },
    {
      invariantKind: "departure",
      statement: "Reading stops at the first numbered file that is not there.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "gap",
      statement: "A body that is not text reads as the replacement character.",
    },
  ],
} as const satisfies Module
