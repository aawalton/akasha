import type { Command } from "../../command-system/commands/command.page-type.ts"

export const subagentSweep = {
  id: "01a072c2-eed8-7f35-9595-65c72afdc7aa",
  pageTypeSlug: "command",
  slug: "subagent-sweep",
  definition: "every subagent page on disk judged, and the stale ones taken away when told to",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKindSlug: "change-mechanical",
  taking: [{ said: "--remove", takes: "take away the pages this run judged stale" }],
  helpNotes: [
    "a run naming nothing reports and writes nothing, which is how a person reads the census first.",
    "a page is judged WORKING, STALE or UNDETERMINED, and only STALE ever goes.",
    "WORKING is a live process acting under the page's agent id, or the seat's transcript naming the subagent as not yet returned.",
    "a transcript only ever adds a WORKING: an entry carrying no agent id joins to no page, so a compacted transcript leaves every judgement as it was.",
    "STALE is a take-down the seat's log says was refused, or a seat no process at all carries the id of.",
    "UNDETERMINED is everything else, because a subagent waiting on the model runs no process of its own.",
    "no page's age is read: a page written long ago under a process still running says nothing.",
    "the report names, for each page, its seat, its agent id, what answers for it, and why.",
    "a removal is landed by this command rather than drafted, as the put-up that wrote the page was.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run naming nothing writes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page goes only where the run was told to remove and the census judged it stale.",
    },
    {
      invariantKind: "absence",
      statement: "No page judged working or undetermined is ever removed.",
    },
    {
      invariantKind: "departure",
      statement: "The census is reported whether or not the run was told to remove.",
    },
    {
      invariantKind: "departure",
      statement: "A word this takes no flag for refuses the whole run.",
    },
    {
      invariantKind: "departure",
      statement: "A run told to remove where nothing is stale says so and writes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Each seat's transcript is read for the subagents that seat has not seen return.",
    },
    {
      invariantKind: "absence",
      statement: "No transcript reading makes a page removable.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript that will not open leaves the census the other evidence reached.",
    },
    {
      invariantKind: "departure",
      statement: "A seat whose reading throws costs that seat alone rather than the whole run.",
    },
    {
      invariantKind: "departure",
      statement: "The commit says why each page went, one line for each.",
    },
    {
      invariantKind: "departure",
      statement: "A page removed is forgotten by whoever read it.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that refused leaves the census reported and the pages where they are.",
    },
  ],
} as const satisfies Command
