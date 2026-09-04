import type { Module } from "@akasha/code-system/module"

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
        "An address is rewritten where a relation states an address rather than where text matches.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which relations state an address is read from the index rather than from the pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "An address to the page type is rewritten in the form that address was written in.",
    },
    {
      invariantKind: "departure",
      statement: "An address to a page of that type carries the type's slug as its prefix.",
    },
    {
      invariantKind: "departure",
      statement: "A bare address to a page of that type is left unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a page is states no address here.",
    },
    {
      invariantKind: "departure",
      statement: "A name imported from the page type's own file is renamed with the page type.",
    },
    {
      invariantKind: "departure",
      statement: "Which places name the page type is read from the checker rather than from text.",
    },
    {
      invariantKind: "departure",
      statement: "A name imported under another name is renamed where imported and not where used.",
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
      statement: "A slug sitting between no path marks is left unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A longer name carrying the old slug is no spelling of the old slug.",
    },
    {
      invariantKind: "departure",
      statement: "A name standing whole in any literal is respelled.",
    },
    {
      invariantKind: "departure",
      statement: "A template's parts are read for a name as a plain string is.",
    },
    {
      invariantKind: "departure",
      statement: "A longer name carrying the renamed one is no spelling of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Where a body still names the old slug is answered by the line the old slug sits on.",
    },
    {
      invariantKind: "absence",
      statement: "An address spelled as an id is left unchanged.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes or moves a file.",
    },
  ],
} as const satisfies Module
