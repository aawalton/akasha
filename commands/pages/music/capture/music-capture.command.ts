import type { Command } from "../../../command.page-type.ts"

export const musicCapture = {
  id: "01a063b0-cb34-7001-99b2-fd47783030fb",
  pageTypeSlug: "command",
  type: "command",
  slug: "music-capture",
  definition: "the command filing what Alan played on Spotify onto the days he played it in",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--dry-run", takes: "say what would land and write nothing" },
    { said: "--json", takes: "give what was filed as JSON rather than as rows" },
  ],
  helpNotes: [
    "the plays are the fifty Spotify gives back for one page, asked for from just past the newest play already filed.",
    "a run finding no play filed anywhere is a priming run, and a priming run scores no first listen.",
    "a play already filed is counted and written no second time.",
    "a listen lands beside the day page the play finished in, and a heard track beside Alan's heard music page.",
    "the day a play is filed under is the ESO day it finished in, which opens at six in the morning in New York.",
    "a day with no page of its own is refused, and a run that refuses files nothing.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Capture adds to the rows filed and rewrites no row already filed.",
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
      statement: "The listens and the heard tracks land as a single commit or not at all.",
    },
    {
      invariantKind: "departure",
      statement: "A run recording nothing lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A day with no page of its own is refused rather than given one.",
    },
    {
      invariantKind: "departure",
      statement: "A page is written through the change working out what kind of path it is.",
    },
    {
      invariantKind: "departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run saying to write nothing reaches no landing and names what would be written.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches Spotify.",
    },
  ],
} as const satisfies Command
