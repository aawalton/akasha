import type { Command } from "../command.page-type.ts"

export const workTree = {
  id: "01a06866-8b85-79cd-a698-d3fa3f18a57b",
  pageTypeSlug: "command",
  slug: "work-tree",
  definition:
    "the command drawing each initiative under the one above it, and the intents it holds",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--json", takes: "the tree as one JSON object, for a caller rather than a reader" },
    { said: "--counts", takes: "how many initiatives and how many intents the tree holds" },
    { said: "--colors", takes: "the color each initiative is drawn in, keyed by its slug" },
  ],
  helpNotes: [
    "named nothing, it prints the tree.",
    "each word names what to print, so one call prints one thing.",
    "an initiative is keyed by the slug it declares rather than by the name of its file.",
    "an intent is keyed by its initiative's slug and its place in that initiative's list.",
    "nothing is stored: the tree is composed from the pages at the moment of asking.",
    "an initiative whose parent names a page that is not there is drawn as a root rather than lost with its children.",
    "an initiative whose parent chain closes into a cycle is drawn as a root in the same way.",
    "the intents an initiative holds are drawn beneath it, ahead of the initiatives beneath it.",
    "an intent keeps the place its initiative states, the order of an intent list being the author's.",
    "an intent opens the page of the initiative holding it, an intent being no page of its own.",
    "a color is the turn state of a seat sitting on that initiative, and a row several seats state takes the liveliest of them.",
    "an initiative no seat sits on carries no color, and an intent carries none at all.",
    "`--colors` opens no initiative page, so a caller repainting rows pays none of the walk the whole tree costs.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tree is composed at the moment of asking rather than read from a store.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative is keyed by the slug the initiative declares rather than by the file name.",
    },
    {
      invariantKind: "departure",
      statement:
        "An initiative whose parent is not there is drawn as a root and stays in the tree.",
    },
    {
      invariantKind: "departure",
      statement: "An initiative whose parent chain closes into a cycle is drawn as a root.",
    },
    {
      invariantKind: "departure",
      statement: "The intents an initiative holds are drawn beneath that initiative.",
    },
    {
      invariantKind: "departure",
      statement: "An intent keeps the place its initiative states rather than being sorted.",
    },
    {
      invariantKind: "departure",
      statement: "The intents come ahead of the initiatives beneath.",
    },
    {
      invariantKind: "departure",
      statement: "An intent is keyed by its initiative's slug and its place in that list.",
    },
    {
      invariantKind: "departure",
      statement: "An intent opens the page of the initiative holding it.",
    },
    {
      invariantKind: "departure",
      statement: "An intent carries its working memory as its note.",
    },
    {
      invariantKind: "departure",
      statement: "A row says whether it is an initiative or an intent.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are counted by what each row is rather than all together.",
    },
    {
      invariantKind: "departure",
      statement: "Each word names the thing to print.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming two words is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A word said twice names one thing rather than two things.",
    },
    {
      invariantKind: "departure",
      statement: "The colors are read from the seat pages alone.",
    },
    {
      invariantKind: "absence",
      statement: "Reading the colors opens no initiative page.",
    },
    {
      invariantKind: "absence",
      statement: "An intent carries no color.",
    },
    {
      invariantKind: "absence",
      statement: "An intent leads nowhere.",
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
