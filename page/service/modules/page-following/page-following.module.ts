import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageFollowing = {
  id: "01a0d4bc-5124-769e-8846-d17754354c40",
  type: "page-type/module",
  slug: "page-following",
  definition:
    "the pages a browser is shown, and each change to them pushed down the one stream it opened",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A browser opens one stream and then says what it follows on that stream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a stream follows is replaced whole each time the browser says it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow names a page type, and names its pages by id or by slug or not at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow naming no pages follows the list, so a page coming or going is pushed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow of a page type follows the page types under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change is pushed only down a stream following the page changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change pushed names the page and says to read it again rather than carrying it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change pushed names the follows it answers by the keys the browser gave them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any file named for a page is a change to that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The index changing under a page type followed as a list is a change to that list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the folders holding pages some stream follows are watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A follow hears each file and folder the computed properties of its pages keep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change there is a change to each page that follow names, or to its list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed property keeping more than it did is followed again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the file a computed property keeps its reads in is heard for that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One page is pushed at most once in each half second, and its last change is never dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stream says something every few seconds so that nothing between closes it as idle.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A stream closed is followed no longer.",
    },
  ],
} as const satisfies Module
