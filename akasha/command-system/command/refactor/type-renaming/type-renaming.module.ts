import type { Module } from "@akasha/code-system/module"

export const typeRenaming = {
  id: "01a0587b-6769-7174-8713-f1d9fe7fd25d",
  pageTypeSlug: "module",
  slug: "type-renaming",
  definition: "every file a page type's slug rename would move or change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rename is refused whole rather than half worked out.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no page type carries is refused rather than answered as nothing to do.",
    },
    {
      invariantKind: "departure",
      statement: "A slug another page type already carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The plural a page type becomes is taken from the caller.",
    },
    {
      invariantKind: "departure",
      statement: "The plural a page type carries now is read off its own file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type whose plural cannot be read is refused rather than renamed without its plural.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a page states is found through the syntax of its file rather than by matching text.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's own file carries its slug and its plural.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's own file carries the name the page type is exported under.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folder a page type stands in is named for the page type and moves with the page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The folder holding many of its pages is named for its plural and moves with that.",
    },
    {
      invariantKind: "departure",
      statement: "Only the tail of a file's name says which page type it is.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index files that stands nowhere on disk is not carried.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes or moves a file.",
    },
    {
      invariantKind: "absence",
      statement: "What is answered here is what a landing would be asked for.",
    },
  ],
} as const satisfies Module
