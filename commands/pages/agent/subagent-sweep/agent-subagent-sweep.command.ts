import type { Command } from "../../../command.page-type.types.ts"

export const agentSubagentSweep = {
  id: "01a072c2-eed8-7f35-9595-65c72afdc7aa",
  pageTypeSlug: "command",
  type: "command",
  slug: "agent-subagent-sweep",
  definition: "every subagent page on disk judged, and the stale ones taken away when told to",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  changeKind: "change-mechanical",
  taking: [{ said: "--remove", takes: "take away the pages this run judged stale" }],
  helpNotes: [
    "a run naming nothing reports and writes nothing, which is how a person reads the census first.",
    "a page is judged WORKING, STALE or UNDETERMINED, and only STALE ever goes.",
    "WORKING is a live process acting under the page's agent id, or the seat's transcript naming the subagent as not yet returned.",
    "STALE is a take-down the seat's log says was refused, a seat no process at all carries the id of, or the seat's transcript naming the subagent as one it saw start and finish.",
    "a transcript reads an agent id off a launch receipt, so a compacted one has no id to end and no id to run, and it leaves every judgement as it was.",
    "the absence of a running subagent is never read as an end, because that is what a truncated transcript looks like too.",
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
        "A page goes only where the run was told to remove and the census judged that page stale.",
    },
    {
      invariantKind: "departure",
      statement: "A page taken away goes through the change removing a file.",
    },
    {
      invariantKind: "departure",
      statement: "The landing a stale page goes through is handed in.",
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
      statement: "A word this command takes no flag for refuses the whole run.",
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
      invariantKind: "departure",
      statement:
        "A transcript entry naming no agent id is dropped rather than carried as an empty name.",
    },
    {
      invariantKind: "departure",
      statement: "An id both readings name is running rather than ended.",
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
      statement: "A seat's running reading and its ended reading are each their own try.",
    },
    {
      invariantKind: "departure",
      statement: "The commit says why each page went on a line for that page.",
    },
    {
      invariantKind: "departure",
      statement: "A page removed is forgotten by every reader of that page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing that refused leaves the census reported and the pages where the pages are.",
    },
  ],
} as const satisfies Command
