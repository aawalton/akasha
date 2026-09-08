import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const domainRows = {
  id: "01a04e9f-4572-74d2-b19a-9fd2f81583eb",
  pageTypeSlug: "module",
  slug: "domain-rows",
  definition: "every domain the domains panel draws, its champion, its parent, and their order",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A page of every page type sitting under `domain` is drawn rather than a `domain` page alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page types sit under `domain` is worked out from the page type pages themselves.",
    },
    {
      invariantKind: "departure",
      statement: "A page is answered under its address rather than its slug.",
    },
    {
      invariantKind: "departure",
      statement: "Two page types may each have a page of one slug.",
    },
    {
      invariantKind: "departure",
      statement: "A part edge is read off the page naming the part.",
    },
    {
      invariantKind: "departure",
      statement: "The parts a page names are read off the value the index has for that page.",
    },
    {
      invariantKind: "departure",
      statement: "A part naming no page drawn here makes no edge.",
    },
    {
      invariantKind: "departure",
      statement: "A page under other than one parent is answered as under no parent.",
    },
    {
      invariantKind: "departure",
      statement: "An order is the parts a page names.",
    },
    {
      invariantKind: "departure",
      statement: "The parts keep the order that page names the parts in.",
    },
    {
      invariantKind: "departure",
      statement: "A domain answers with the persona championing that domain.",
    },
    {
      invariantKind: "departure",
      statement: "The champion edge is read backwards off the persona rather than off the domain.",
    },
    {
      invariantKind: "departure",
      statement: "A persona's own slug is read off her file name rather than out of her page.",
    },
    {
      invariantKind: "departure",
      statement: "A domain two personas champion answers with the first persona by name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain no persona champions answers with no champion rather than an empty champion.",
    },
    {
      invariantKind: "departure",
      statement: "The index files an edge without the place the edge was stated in.",
    },
    {
      invariantKind: "departure",
      statement: "The index is asked which personas champion a page only where a persona could.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page a persona could be naming is a page whose address or whose slug that persona states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A slug two page types each have widens the pages asked about rather than narrowing the pages.",
    },
    {
      invariantKind: "absence",
      statement: "No page is opened for the parts that page names.",
    },
    {
      invariantKind: "absence",
      statement: "No page is opened for the order those parts keep.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the pages line by line.",
    },
    {
      invariantKind: "absence",
      statement: "Every page answered is a page the index named first.",
    },
  ],
} as const satisfies Module
