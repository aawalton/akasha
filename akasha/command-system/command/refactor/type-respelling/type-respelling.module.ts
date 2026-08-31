import type { Module } from "../../../../code-system/module/module.page-type.ts"

export const typeRespelling = {
  id: "01a0588c-085a-731a-ae50-91f977f7305e",
  pageTypeSlug: "module",
  slug: "type-respelling",
  definition:
    "how a body spells a renamed page type, in the addresses it states and the names it imports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An address is rewritten where a relation states one rather than where text matches.",
    },
    {
      invariantKind: "departure",
      statement: "Which relations state one is read from the index rather than from the pages.",
    },
    {
      invariantKind: "departure",
      statement: "An address to the page type is rewritten in the form it was written in.",
    },
    {
      invariantKind: "departure",
      statement: "An address to a page of that type carries the type's slug as its prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A bare address to a page of that type is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a page is states no address here.",
    },
    {
      invariantKind: "departure",
      statement: "A name imported from the page type's own file is renamed with it.",
    },
    {
      invariantKind: "departure",
      statement: "Which places name the page type is read from the checker rather than from text.",
    },
    {
      invariantKind: "departure",
      statement: "A name imported under another is renamed where imported and not where used.",
    },
    {
      invariantKind: "departure",
      statement: "The page type's own file is renamed throughout rather than through an import.",
    },
    {
      invariantKind: "departure",
      statement: "A slug standing between path marks in any literal is repointed.",
    },
    {
      invariantKind: "departure",
      statement: "A template's parts are read for a slug as a plain string is.",
    },
    {
      invariantKind: "departure",
      statement: "A slug standing between no path marks is left as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A longer name carrying the old slug is no spelling of it.",
    },
    {
      invariantKind: "departure",
      statement: "Where a body still names the old slug is answered by the line it stands on.",
    },
    {
      invariantKind: "absence",
      statement: "An address spelled as an id is left as it stands.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes or moves a file.",
    },
  ],
} as const satisfies Module
