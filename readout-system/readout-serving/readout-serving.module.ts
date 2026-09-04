import type { Module } from "@akasha/code-system/module"

export const readoutServing = {
  id: "01a05bc9-a678-768f-ba6e-f91fdcf9ec6d",
  pageTypeSlug: "module",
  slug: "readout-serving",
  definition: "what a route answers when a caller asks for one readout's reading",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A route serving this answer holds the wiring and no part of the answering.",
    },
    {
      invariantKind: "departure",
      statement: "The credential a caller is admitted on is handed in rather than read from here.",
    },
    {
      invariantKind: "departure",
      statement: "A site admitting on more than a secret hands in its own guard instead.",
    },
    {
      invariantKind: "departure",
      statement: "A guard handed in answers a refusal or nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal a guard answers is served whole rather than made again here.",
    },
    {
      invariantKind: "departure",
      statement: "The count answered is the reading carried in rather than one taken here.",
    },
    {
      invariantKind: "departure",
      statement: "A reading older than the window is answered as none rather than as a count.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading never taken and a reading too old are told apart rather than both read as none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading relayed here and a reading carried on a readout's own row are both read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading carried on a row is aged by the window a relayed reading is aged by.",
    },
    {
      invariantKind: "departure",
      statement:
        "The route for a single readout answers no reading for a reading too old or never taken.",
    },
    {
      invariantKind: "departure",
      statement: "The readout answered for is handed in rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "The key a reading is answered under is read off the readout's own page.",
    },
    {
      invariantKind: "departure",
      statement: "The scale read is the one the readout's page names rather than one named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A readout whose page cannot be read is answered under no key rather than under a guessed key.",
    },
    {
      invariantKind: "departure",
      statement: "The rungs and the words for an empty reading are read from the store.",
    },
    {
      invariantKind: "departure",
      statement: "A rung or a word the store withholds is left out rather than made up.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing between here and the tile is allowed to keep an answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the site the answer is served from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a scale.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a group.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides the color a count is shown in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a person or a device.",
    },
  ],
} as const satisfies Module
