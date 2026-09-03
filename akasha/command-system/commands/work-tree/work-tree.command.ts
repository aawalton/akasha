import type { Command } from "../command.page-type.ts"

export const workTree = {
  id: "01a06866-8b85-79cd-a698-d3fa3f18a57b",
  pageTypeSlug: "command",
  slug: "work-tree",
  definition: "the command drawing each initiative under the initiative it stands beneath",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--json", takes: "the tree as one JSON object, for a caller rather than a reader" },
    { said: "--counts", takes: "how many initiatives the tree holds, in place of the tree" },
    { said: "--colors", takes: "the color each initiative is drawn in, keyed by its slug" },
  ],
  helpNotes: [
    "named nothing, it prints the tree.",
    "each word names what to print, so one call prints one thing.",
    "an initiative is keyed by the slug it declares rather than by the name of its file.",
    "nothing is stored: the tree is composed from the pages at the moment of asking.",
    "an initiative whose parent names a page that is not there is drawn as a root rather than lost with its children.",
    "a color is the turn state of a seat standing on that initiative, and a row several seats state takes the liveliest of them.",
    "an initiative no seat stands on carries no color.",
    "`--colors` opens no initiative page, so a caller repainting rows pays none of the walk the whole tree costs.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree is composed at the moment of asking rather than read from a store.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative is keyed by the slug it declares rather than by its file name.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative whose parent is not there is drawn as a root and stays in the tree.",
    },
    {
      invariantKind: "departure",
      statement: "Each word names what to print, and a call naming two of them is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A word said twice names one thing rather than two.",
    },
    {
      invariantKind: "departure",
      statement: "The colors are read from the seat pages alone, opening no initiative.",
    },
    {
      invariantKind: "departure",
      statement: "A tree holding no initiative is refused rather than printed as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
} as const satisfies Command
