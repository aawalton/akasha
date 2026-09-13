import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const slugRenaming = {
  id: "01a09c61-7a20-7e53-a461-78bf666a426e",
  type: "module",
  slug: "slug-renaming",
  definition: "one page's slug restated in its own body, in every page naming it and in its export",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A slug past the hundred characters a page's slug holds is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A slug's length is bounded here as it is where a page is composed.",
    },
    {
      invariantKind: "departure",
      statement: "A slug that is no slug, or the slug the page carries, is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A slug a page of that page type carries already is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A body exporting no name its slug makes is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page naming this page under a key its property's slug does not spell is restated.",
    },
    {
      invariantKind: "departure",
      statement: "A plural handed in is stated beside the slug in the page's own body.",
    },
    {
      invariantKind: "departure",
      statement: "A plural the page states already is left alone rather than restated.",
    },
    {
      invariantKind: "departure",
      statement: "A name handed in is stated where the page states another name.",
    },
    {
      invariantKind: "departure",
      statement: "A call handing in no name leaves the name the page states alone.",
    },
    {
      invariantKind: "departure",
      statement: "The export is spelled anew over the bodies the restating leaves.",
    },
    {
      invariantKind: "departure",
      statement: "The module spelling an export anew is called rather than reached through a rung.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here moves a file.",
    },
  ],
} as const satisfies Module
