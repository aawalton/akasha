import type { Module } from "@akasha/code/module"

export const shadow = {
  id: "01a053a5-3240-7a15-81e0-042ef50c4d89",
  pageTypeSlug: "module",
  type: "module",
  slug: "shadow",
  definition: "the files and index as a change would leave them",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page the change has is read from the body the change has.",
    },
    {
      invariantKind: "departure",
      statement: "A page the change does not have is read from the value index.",
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
      statement: "A page's value is read from the file that page's own page type is filed under.",
    },
    {
      invariantKind: "departure",
      statement: "That page type is read off the page's file name.",
    },
    {
      invariantKind: "departure",
      statement:
        "That file is read once for a page type and held for the life of the memo handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing in a memo has a page value read once for that caller's life.",
    },
    {
      invariantKind: "departure",
      statement: "A path a settle had is forgotten from the memo handed in.",
    },
    {
      invariantKind: "absence",
      statement: "No page type but the one a file name states is read to answer for that name.",
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
      statement: "That face is bound to the reading the shadow has.",
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
      statement:
        "The entry files the change writes are worked out by the same rule a landing settles by.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shadow answers the entry files the change writes beside the index the change leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller setting that index up elsewhere writes the entry files the change files.",
    },
    {
      invariantKind: "departure",
      statement:
        "The shadow lies over the committed index and has only the entry files the change touches.",
    },
    {
      invariantKind: "departure",
      statement: "A body that must be loaded is reached at the path on disk with the body.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change only has elsewhere is at the path the body came from.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change writes anew is at no path and is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change does not carry has its own body.",
    },
    {
      invariantKind: "departure",
      statement: "An audit leaves everything as everything is.",
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
        "A shadow that could not be worked out is refused rather than answered from the committed index.",
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
      statement: "A shadow is worked out over a reading a caller hands in.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing in no reading is answered over the reading at the root.",
    },
    {
      invariantKind: "departure",
      statement: "A reading a settle left has the change that settle was handed.",
    },
    {
      invariantKind: "departure",
      statement: "Settling one change and then a second leaves the reading both changes leave.",
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
