import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addressRestating = {
  id: "01a09c32-ce10-789c-bc0c-792c98ca95e4",
  type: "module",
  slug: "address-restating",
  definition: "the edits restating many pages' addresses over one reading of the bodies",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every address handed in is restated over one reading of the bodies.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A spelling is found by the parse rather than by matching the text of the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is parsed only where its text spells the page type of an address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body spelling no address handed in is read and left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bodies read are the ones a search of the tree names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bodies read are the paths the world holds once the edits so far have landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer writes is read beside the paths the index lists.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the answer carries away is left out of the bodies read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree that could not be searched refuses rather than restating nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address is a page type and a slug parted by `/`, with a scope between them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address handed in that is no address refuses the whole answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address handed in as its own new address refuses the whole answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call handing in no address at all is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A slug naming a page without its page type is left as that slug is.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a change.",
    },
  ],
} as const satisfies Module
