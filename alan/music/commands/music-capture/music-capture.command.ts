import type { Command } from "@akasha/command-system/command"

export const musicCapture = {
  id: "01a063b0-cb34-7001-99b2-fd47783030fb",
  pageTypeSlug: "command",
  slug: "music-capture",
  definition: "the command filing what Alan played on Spotify onto the ESO days he played it in",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--dry-run", takes: "say what would land and write nothing" },
    { said: "--json", takes: "give what was filed as JSON rather than as rows" },
  ],
  helpNotes: [
    "the plays are the fifty Spotify gives back for one page, asked for from just past the newest play already filed.",
    "a run finding no play filed anywhere is a priming run, and a priming run scores no first listen.",
    "a play already filed is counted and written no second time.",
    "a listen lands beside the ESO day the play finished in, and a heard track beside Alan's heard music page.",
    "an ESO day with no page of its own gets that page before the listens land beside it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Capture adds to what is filed and rewrites none of it.",
    },
    {
      invariantKind: "departure",
      statement: "A priming run scores no first listen.",
    },
    {
      invariantKind: "departure",
      statement: "The plays are worked oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "A play Spotify names no track id for is passed over and counted.",
    },
    {
      invariantKind: "departure",
      statement: "A track is heard again where either its id or its title key is already filed.",
    },
    {
      invariantKind: "departure",
      statement: "A track already heard keeps the instant that track was first heard.",
    },
    {
      invariantKind: "departure",
      statement: "The listens and the heard tracks land as one commit or as none.",
    },
    {
      invariantKind: "departure",
      statement: "A run recording nothing lands nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches Spotify.",
    },
  ],
} as const satisfies Command
