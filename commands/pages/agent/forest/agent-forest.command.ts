import type { Command } from "akasha/commands/command.page-type.types.ts"

export const agentForest = {
  id: "01a0693a-d9ea-7709-822c-183271014440",
  type: "command",
  slug: "agent-forest",
  definition: "the command answering the seats a seat tree is drawn from, as one JSON object",
  code: "ts",
  test: "ts",
  parts: ["module/no-word-reading"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The answer is one JSON object carrying `repo`, `rows` and `subagents`.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries `id`, `name`, `parent_agent_id`, `principal`, `launch` and `mode`.",
    },
    {
      invariantKind: "departure",
      statement: "A row carries `live`, `state`, `waitingOn`, `color` and `at` as well.",
    },
    {
      invariantKind: "departure",
      statement: "`name` is the seat's own name, which is what its page is called.",
    },
    {
      invariantKind: "departure",
      statement: "A page naming neither a person nor a seat above it carries no `launch`.",
    },
    {
      invariantKind: "departure",
      statement: "`state` is `working`, `idle-pending`, `ready`, `idle` or `stopped`.",
    },
    {
      invariantKind: "departure",
      statement: "An idle seat in an on-call role reads `ready` rather than `idle`.",
    },
    {
      invariantKind: "departure",
      statement: "`subagents` is every subagent page akasha holds.",
    },
    {
      invariantKind: "departure",
      statement: "A word this command is given is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every seat is read from its page in the memory repository rather than from a row.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with an agent present in that seat reads `live` true.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no agent present in that seat reads `live` false.",
    },
    {
      invariantKind: "departure",
      statement:
        "An ancestor is fetched back so a live branch keeps the root that branch belongs under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat the working tree no longer has is read from the newest commit that had that seat.",
    },
    {
      invariantKind: "departure",
      statement: "`principal` names the person the seat's page names.",
    },
    {
      invariantKind: "departure",
      statement: "`principal` reads `agent` where the page names a seat above that page.",
    },
    {
      invariantKind: "departure",
      statement: "`launch` reads `opened` for a person and `spawned` for a seat above that seat.",
    },
    {
      invariantKind: "departure",
      statement: "`mode` is said by the seat's page and is not worked out from `launch`.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is not a string reads as absent rather than as its own rendering.",
    },
    {
      invariantKind: "departure",
      statement: "`state` is read from the turn records the seat keeps rather than from its page.",
    },
    {
      invariantKind: "departure",
      statement:
        "An idle seat whose turn start source names anything but `none` is `idle-pending`.",
    },
    {
      invariantKind: "departure",
      statement: "A seat keeping no turn record at all reads `stopped` rather than `idle`.",
    },
    {
      invariantKind: "departure",
      statement: "Every row has `state` and `waitingOn` whatever that row's state reads.",
    },
    {
      invariantKind: "departure",
      statement: "A state's color is named by that state's own page rather than said here.",
    },
    {
      invariantKind: "departure",
      statement: "A state's page is read off disk on every call.",
    },
    {
      invariantKind: "departure",
      statement: "`at` is answered only where the file opened declared the id the row has.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index names for a page that has gone is answered as no path at all.",
    },
    {
      invariantKind: "departure",
      statement: "`repo` is the checkout every `at` was read against.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent page is keyed by the seat that ran that subagent and the id that subagent runs under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent's seat name and agent id are read off its page rather than off its file name.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent page states the kind that subagent was dispatched as or states none.",
    },
    {
      invariantKind: "departure",
      statement: "One test calls the command itself.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier reaching nothing fails there.",
    },
    {
      invariantKind: "absence",
      statement: "Which subagents are running is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing but the scan cursor a seat's turn record keeps.",
    },
  ],
  name: "forest",
} as const satisfies Command
