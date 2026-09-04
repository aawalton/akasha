import type { Module } from "@akasha/code-system/module"

export const fileRelation = {
  id: "01a05bd6-c530-7b54-851f-32241308d945",
  pageTypeSlug: "module",
  slug: "file-relation",
  definition: "the relations a file-backed page is in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Whether a page is filed under a slug is asked of `@akasha/pages-system-service` by that slug.",
    },
    {
      invariantKind: "departure",
      statement: "A name written as a page type and a slug is asked for by its slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "A question the pages refuse is answered unasked rather than absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which properties of a page type name other pages is read from what that type declares.",
    },
    {
      invariantKind: "gap",
      statement: "Reaching every page that names one page refuses.",
    },
    {
      invariantKind: "absence",
      statement: "`@akasha/pages-system-service` holds no index of what names what.",
    },
    {
      invariantKind: "absence",
      statement: "`@akasha/pages-system-service` answers one page type at a time.",
    },
  ],
} as const satisfies Module
