import type { Module } from "@akasha/code-system/module"

export const pageRetyping = {
  id: "01a06e4c-2a91-7a0a-8c4c-40eb00b9f1f1",
  pageTypeSlug: "module",
  slug: "page-retyping",
  definition: "the page type one page is, changed everywhere that answer is written",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A retype takes the address a page is at rather than a slug on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A retype takes the slug of the page type the page becomes.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index does not carry is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the index does not carry is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page already of the page type named is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key the page states that the page type it becomes reads no property by is refused.",
    },
    {
      invariantKind: "departure",
      statement: "That key is named in the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The property the old page type read by that key is named in the refusal too.",
    },
    {
      invariantKind: "constraint",
      statement: "A key is worked out from the property it reads rather than from the page type.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own file arrives under the tail of the page type it becomes.",
    },
    {
      invariantKind: "departure",
      statement: "Every file beside a page is carried with that page.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside a page arrives under the tail of the page type it becomes.",
    },
    {
      invariantKind: "departure",
      statement: "A body beside a page is carried rather than read as prose.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own body states the page type it becomes.",
    },
    {
      invariantKind: "departure",
      statement: "The type a page's own body satisfies is the one its new page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "The import naming that type is rewritten with it.",
    },
    {
      invariantKind: "departure",
      statement: "A type in the page's own package is imported by a relative reach.",
    },
    {
      invariantKind: "departure",
      statement: "A type in another package is imported by the export naming it.",
    },
    {
      invariantKind: "departure",
      statement: "A package exporting no path to that type refuses the retype.",
    },
    {
      invariantKind: "departure",
      statement: "An address naming the page under its old page type is repointed.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming a file this carries is repointed.",
    },
    {
      invariantKind: "departure",
      statement: "A package manifest exporting a file this carries is repointed.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies a retype carries are read from the commit the retype sits on.",
    },
    {
      invariantKind: "departure",
      statement: "Every file a retype touches lands in one commit or none of them does.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` names every file the retype would carry.",
    },
    {
      invariantKind: "departure",
      statement: "`--dry-run` writes nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A retype changes no page's slug.",
    },
    {
      invariantKind: "absence",
      statement: "A retype moves no folder.",
    },
  ],
} as const satisfies Module
