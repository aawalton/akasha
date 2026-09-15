import type { Command } from "akasha/command/command.page-type.types.ts"

export const agentSubagentSweep = {
  id: "01a072c2-eed8-7f35-9595-65c72afdc7aa",
  type: "command",
  slug: "agent-subagent-sweep",
  definition:
    "the command judging every subagent page on disk and taking the stale ones away when told",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is judged working, stale or undetermined.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page is working where a process acts under its agent id or its seat has not seen it return.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page is stale where its seat's subagent-presence log says its take-down was dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is stale where no process at all carries its seat's agent id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is stale where it was stopped from the agents panel.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The stop beside each page is read off disk here and handed to the census.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No stop makes a page removable that a live process acts under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is stale where the transcript that dispatched it saw it start and return.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent one subagent dispatched is seen that way as a seat's own is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fold is read for that though whatever it folds has itself returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is stale where its last record came before its seat's client started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page neither working nor stale is undetermined.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A compacted transcript names no agent id and leaves every judgement as it was.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A subagent the running reading does not name is not thereby ended.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page's age is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names each page's seat, its agent id, what answers for it and why.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A removal is landed by this command rather than drafted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run naming nothing writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page goes only where the run was told to remove and the census judged that page stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page taken away goes through the change taking a file of any kind away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That change takes a page away with every file that page claims.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a page has beside it moves onto that page's seat before the page goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page whose seat the index has no page for and that has nothing waiting still goes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names what moved before it names what went.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The landing a stale page goes through is handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page judged working or undetermined is ever removed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The census is reported whether or not the run was told to remove.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word this command takes no flag for refuses the whole run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run told to remove where nothing is stale says so and writes nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each seat's transcript is read for the subagents that seat has not seen return.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The seats read are the seats the index names rather than the seats the pages name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat every page of whose subagents has gone is read as any other seat is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names each subagent a transcript names as at work that has no page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No subagent named that way is thereby removed or written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A transcript entry naming no agent id is dropped rather than carried as an empty name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An id both readings name is running rather than ended.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No transcript reading makes a page removable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript that will not open leaves the census the other evidence reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat whose reading throws costs that seat alone rather than the whole run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's running reading and its ended reading are each their own try.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each seat's client is read for the subagents that client started after.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat stating no client leaves its subagents judged on the other evidence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That reading is a try of its own like the two beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The commit says why each page went on a line for that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page removed is forgotten by every reader of that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent taken away has the readings its seat kept for it dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Those readings are dropped only after the removal landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is asked once for every page of its own that went.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose seat the index has no page for drops no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names how many readings each seat keeps no longer.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A run told not to remove drops no reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A landing that refused leaves the census reported and the pages where the pages are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that refused names in its refusal what it had moved onto a seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A move that threw part way refuses the run and names what moved before it threw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stale page goes whether or not a subagent left edits waiting beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A stale page whose seat the index has no page for is left where it is while edits wait beside it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report names each page left that way and says why that page was left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Why a page is left that way is read from the module the take-down reads it from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that refused after the landing committed names that commit.",
    },
  ],
  name: "subagent-sweep",
  arguments: [{ argument: "argument/remove" }],
} as const satisfies Command
