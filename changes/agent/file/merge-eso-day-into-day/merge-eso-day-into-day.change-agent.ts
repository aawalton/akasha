import type { ChangeAgent } from "../../change-agent.page-type.ts"

export const mergeEsoDayIntoDay = {
  id: "01a08761-fcda-7171-a430-426200beddf7",
  pageTypeSlug: "change-agent",
  slug: "merge-eso-day-into-day",
  changeMode: "change-mode-move",
  definition: "every ESO day page folded into the day page of the same date",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The ESO day pages folded are the pages the index files under `eso-day`.",
    },
    {
      invariantKind: "departure",
      statement: "The pages are folded in the order their paths sort.",
    },
    {
      invariantKind: "departure",
      statement: "The date is read from the ESO day's slug with `eso-day-` taken off the front.",
    },
    {
      invariantKind: "departure",
      statement: "The day page's path is spelled out of that date rather than read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A date whose day page cannot be read is refused rather than folded.",
    },
    {
      invariantKind: "departure",
      statement: "The keys carried are the keys with a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Those keys are `healthSamples` and `listens`.",
    },
    {
      invariantKind: "departure",
      statement: "A file beside the ESO day page moves before the key naming that file is stated.",
    },
    {
      invariantKind: "departure",
      statement: "The key is stated on the day page under the value the ESO day page stated.",
    },
    {
      invariantKind: "absence",
      statement: "No title and no ESO day is carried, the day page holding both already.",
    },
    {
      invariantKind: "absence",
      statement: "No `surplusTierSaid` is carried, one page stating it and no code reading it.",
    },
    {
      invariantKind: "departure",
      statement: "The ESO day page goes by the change taking one file away and judging nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The change taking a page away would take the files that moved, so it is unused.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO day page with no body left is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page passed over is counted against no count.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many ESO day pages this call folds.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count folds every ESO day page.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is folded over the edits the pages before it left.",
    },
    {
      invariantKind: "departure",
      statement: "One page refused refuses the whole change.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the ESO day page that drew the refusal.",
    },
    {
      invariantKind: "departure",
      statement: "This change goes once every ESO day page has been folded.",
    },
    {
      invariantKind: "departure",
      statement: "Each change composed here is reached through the runner rather than imported.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
  changeKind: "change-checked",
} as const satisfies ChangeAgent
