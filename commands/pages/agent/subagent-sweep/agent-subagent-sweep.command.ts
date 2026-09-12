import type { Command } from "akasha/commands/command.page-type.types.ts"

export const agentSubagentSweep = {
  id: "01a072c2-eed8-7f35-9595-65c72afdc7aa",
  type: "command",
  slug: "agent-subagent-sweep",
  definition:
    "the command judging every subagent page on disk and taking the stale ones away when told",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  taking: [{ said: "--remove", takes: "take away the pages this run judged stale" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is judged working, stale or undetermined.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is working where a process acts under its agent id or its seat has not seen it return.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page is stale where its seat's subagent-presence log says its take-down was dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A page is stale where no process at all carries its seat's agent id.",
    },
    {
      invariantKind: "departure",
      statement: "A page is stale where its seat's transcript saw it start and return.",
    },
    {
      invariantKind: "departure",
      statement: "A page is stale where its last record came before its seat's client started.",
    },
    {
      invariantKind: "departure",
      statement: "A page neither working nor stale is undetermined.",
    },
    {
      invariantKind: "departure",
      statement: "A compacted transcript names no agent id and leaves every judgement as it was.",
    },
    {
      invariantKind: "absence",
      statement: "A subagent the running reading does not name is not thereby ended.",
    },
    {
      invariantKind: "absence",
      statement: "No page's age is read.",
    },
    {
      invariantKind: "departure",
      statement: "The report names each page's seat, its agent id, what answers for it and why.",
    },
    {
      invariantKind: "departure",
      statement: "A removal is landed by this command rather than drafted.",
    },
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
      statement: "A page taken away goes through the change taking a file of any kind away.",
    },
    {
      invariantKind: "departure",
      statement: "That change takes a page away with every file that page claims.",
    },
    {
      invariantKind: "departure",
      statement: "What a page has beside it moves onto that page's seat before the page goes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose seat the index has no page for and that has nothing waiting still goes.",
    },
    {
      invariantKind: "departure",
      statement: "The report names what moved before it names what went.",
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
      statement: "Each seat's client is read for the subagents that client started after.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no client leaves its subagents judged on the other evidence.",
    },
    {
      invariantKind: "departure",
      statement: "That reading is a try of its own like the two beside it.",
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
    {
      invariantKind: "departure",
      statement: "A run that refused names what it had already moved onto a seat.",
    },
    {
      invariantKind: "departure",
      statement: "A move that threw part way refuses the run and names what moved before it threw.",
    },
    {
      invariantKind: "departure",
      statement: "A stale page goes whether or not a subagent left edits waiting beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stale page whose seat the index has no page for is left where it is while edits wait beside it.",
    },
    {
      invariantKind: "departure",
      statement: "The report names each page left that way and says why that page was left.",
    },
    {
      invariantKind: "departure",
      statement: "Why a page is left that way is read from the module the take-down reads it from.",
    },
  ],
  name: "subagent-sweep",
} as const satisfies Command
