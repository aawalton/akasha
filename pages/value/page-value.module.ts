import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageValue = {
  id: "01a0592a-2e05-7e6a-941f-9dfd06790615",
  type: "module",
  slug: "page-value",
  definition: "the value a page's body declares, and what one of its keys has",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  pageBodyReaders: ["valueAt", "textUnder"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's body can be loaded after the file the body came from is gone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reader answering a body at a path is built here rather than by the test handing the reader in.",
    },
    {
      invariantKind: "departure",
      statement: "The value a body declares is the first object the body exports.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load answers with why rather than with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body is loaded without a file being written.",
    },
    {
      invariantKind: "departure",
      statement: "A body importing a value rather than a type does not load.",
    },
    {
      invariantKind: "departure",
      statement: "A key is read as the type that key is asked for or as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The text one key has at a path is read here rather than beside each reader.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming a page by page type and slug is read here for its slug alone.",
    },
    {
      invariantKind: "departure",
      statement: "A key naming one page or a list of pages is read here as a list of slugs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "absence",
      statement:
        "No page type names this module as its loader, since a body is loaded from text, not a path.",
    },
    {
      invariantKind: "departure",
      statement: "Importing this module makes no transpiler.",
    },
    {
      invariantKind: "departure",
      statement: "A runtime with no transpiler refuses rather than answering nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load is told apart from a runtime that cannot load.",
    },
    {
      invariantKind: "departure",
      statement: "A body is answered only where the answer carries that body's own export names.",
    },
    {
      invariantKind: "departure",
      statement: "A body compiled as another body's code is compiled again rather than answered.",
    },
  ],
} as const satisfies Module
