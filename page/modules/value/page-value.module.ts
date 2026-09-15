import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageValue = {
  id: "01a0592a-2e05-7e6a-941f-9dfd06790615",
  type: "page-type/module",
  slug: "page-value",
  definition: "the value a page's body declares, and what one of its keys has",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  pageBodyReaders: ["valueAt", "textUnder"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's body can be loaded after the file the body came from is gone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader answering a body at a path is built here rather than by the test handing the reader in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value a body declares is the first object the body exports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that will not load answers with why rather than with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is loaded without a file being written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body importing a value rather than a type does not load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key is read as the type that key is asked for or as nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The text one key has at a path is read here rather than beside each reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming a page by page type and slug is read here for its slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key naming one page or a list of pages is read here as a list of slugs.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No page type names this module as its loader, since a body is loaded from text, not a path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Importing this module makes no transpiler.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A runtime with no transpiler refuses rather than answering nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body that will not load is told apart from a runtime that cannot load.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body is answered only where the answer carries that body's own export names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body compiled as another body's code is compiled again rather than answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body of the shape every page has is read off its text rather than run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body of any other shape is run, the reading having refused it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading answers the object the body's one value export declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body exporting a second value is refused by the reading rather than read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An export of a type declares no value and is not counted as that second one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An export is looked for where a line opens rather than anywhere in the body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a page body holds is text, a number, true, false, null, a list or an object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key spelled bare and a key spelled as text are one key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text a body spells as text added to text is answered joined.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What follows the object is read far enough to tell a type-level tail from an expression.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The reading takes in no comment, so a body carrying one is run instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body loaded once is answered from what was loaded rather than loaded again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bodies held that way are bounded, and the whole lot goes at the bound.",
    },
  ],
} as const satisfies Module
