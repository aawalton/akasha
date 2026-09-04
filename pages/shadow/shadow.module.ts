import type { Module } from "@akasha/code-system/module"

export const shadow = {
  id: "01a053a5-3240-7a15-81e0-042ef50c4d89",
  pageTypeSlug: "module",
  slug: "shadow",
  definition: "the files and index as a change would leave them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page the change carries is read from the body the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change does not carry is read from the value index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page the value index does not name is read from the body the change leaves at its path.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow cast over no change reads a body from the working tree.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read from the working tree while a change is judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "The value index is read at the shadow's first ask rather than when the change was taken.",
    },
    {
      invariantKind: "departure",
      statement:
        "A check judging a change reads the index the change leaves rather than the committed index.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow over a change that moves something holds the index to no commit.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow over a change that moves nothing holds the index to the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow answers the index's questions through a face of its own.",
    },
    {
      invariantKind: "departure",
      statement: "That face is bound to the reading the shadow holds.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing but that face reaches the shadow's reading.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shadow worked out for a change comes back beside the reading that shadow was bound over.",
    },
    {
      invariantKind: "departure",
      statement: "Every way a shadow is made binds that face.",
    },
    {
      invariantKind: "departure",
      statement: "What the change files is worked out by the same rule a landing settles by.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow answers what the change files beside the index the change leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A caller standing that index up elsewhere writes what the change files.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shadow lies over the committed index and holds only the entry files the change touches.",
    },
    {
      invariantKind: "departure",
      statement: "A body that must be loaded is reached at the path on disk holding the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change only carries elsewhere stands at the path the body came from.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change writes anew stands at no path and is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change does not carry holds its own body.",
    },
    {
      invariantKind: "departure",
      statement: "An audit leaves everything as everything stands.",
    },
    {
      invariantKind: "departure",
      statement: "There the committed index is the answer worked out from nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change answering `before` and `after` with one reader is a change nothing moved in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shadow that could not be worked out is refused and never stood in for by the committed index.",
    },
    {
      invariantKind: "departure",
      statement: "One change is one shadow held against the change itself.",
    },
    {
      invariantKind: "departure",
      statement: "A shadow over a change is asked for one way.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shadow handed to a reader that may never read the shadow is worked out at the first reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is copied and no scratch directory is made.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the index.",
    },
    {
      invariantKind: "gap",
      statement:
        "The value index a shadow answers from describes the commit the change is judged against.",
    },
    {
      invariantKind: "gap",
      statement: "A page the shadow's index names is a page the change answers a body for.",
    },
  ],
} as const satisfies Module
