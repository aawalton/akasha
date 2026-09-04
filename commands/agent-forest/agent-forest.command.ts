import type { Command } from "../../command-system/commands/command.page-type.ts"

export const agentForest = {
  id: "01a0693a-d9ea-7709-822c-183271014440",
  pageTypeSlug: "command",
  slug: "agent-forest",
  definition: "the seats a seat tree is drawn from, as one JSON object",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [],
  helpNotes: [
    "it takes no word at all, so any word said to it is refused.",
    "it prints one JSON object and nothing else, carrying `repo`, `rows` and `subagents`.",
    "a row carries `id`, `name`, `parent_agent_id`, `principal`, `launch`, `mode`, `live`, `state`, `waitingOn`, `color` and `at`.",
    "every seat is read from its page in the memory repository and never from a row.",
    "a seat in that repository with an agent present in it reads `live` true.",
    "a row reading `live` false is an ancestor fetched back in because something under it is present.",
    "that is how a departed seat keeps a live branch attached to the root it belongs under.",
    "such a seat's page is read from the newest commit that held it where the working tree no longer does.",
    "`name` is the seat's own name, which is what its page is called.",
    "`principal` is the person the seat's page names, or `agent` where it names a seat above it instead.",
    "`launch` reads `opened` for the first and `spawned` for the second, and a page stating neither carries neither.",
    "`mode` is the mode the seat's page says it starts in, an attribute of its own that `launch` does not give.",
    "a value that is not a string reads as absent rather than as its own rendering.",
    "`state` is `working`, `idle-pending`, `idle` or `stopped`, read from what the seat itself keeps rather than from the page.",
    "three of the four are stamped by a hook as the turn moves: working while a turn or a compaction runs, idle once one ends, stopped once the session does.",
    "the fourth is read rather than stamped — an idle seat whose turn start source names anything but `none` is `idle-pending`.",
    "`waitingOn` says what such a seat waits on, and every row carries both keys whatever its state.",
    "a seat keeping no turn record at all has taken no turn and reads `stopped`, which is what a seat whose session never started holds.",
    "a seat keeping records from before the stamps reads `idle`.",
    "`color` is the color that state's own page names, named rather than specified, so whatever draws it picks the shade from its own palette.",
    "a state's page is read off disk on every call rather than held, because one long-lived server answers this.",
    "a color rewritten under that server is the color it must next answer, which is why nothing here is cached.",
    "every state names a color, so `color` reads null only for a seat keeping no records at all.",
    "`repo` is the akasha checkout every path here was resolved against, and `at` is a path inside it.",
    "so a caller joins the two rather than keeping a second copy of where the repository sits.",
    "`at` is there only where the page is: a row reads null rather than naming a page that is not there.",
    "that is what a seat read back from a commit holds, and what a seat that stopped between the walk and this line holds.",
    "every path printed was opened while this answer was composed and made to declare the id the row carries.",
    "so a path the index still names for a page that has gone is answered as no path at all rather than as one that will not open.",
    "`subagents` is every subagent page akasha holds, keyed by the seat that ran the subagent and the id the subagent runs under.",
    "both of those are read off the page rather than taken apart from its file name.",
    "which subagents are running is not answered here and cannot be: it is read from what each seat is doing.",
    "these are the pages, for a caller holding the running ones to join against.",
    "the editor's agent tree asks this as a child and joins `repo` onto each `at` to open a page.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "It takes no word, and a word it is given is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every seat is read from its page in the memory repository rather than from a row.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat with an agent present in it reads `live` true, and every other seat false.",
    },
    {
      invariantKind: "departure",
      statement: "An ancestor is fetched back so a live branch keeps the root it belongs under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A seat the working tree no longer holds is read from the newest commit that held it.",
    },
    {
      invariantKind: "departure",
      statement:
        "`principal` names a person, or `agent` where the page names a seat above it instead.",
    },
    {
      invariantKind: "departure",
      statement: "`launch` reads `opened` for a person and `spawned` for a seat above it.",
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
      statement: "`state` is read from what the seat itself keeps rather than from its page.",
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
      statement: "Every row carries both `state` and `waitingOn`, whatever the state reads.",
    },
    {
      invariantKind: "departure",
      statement: "A state's color is named by that state's own page rather than said here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A state's page is read off disk on every call, so a rewritten color is answered next.",
    },
    {
      invariantKind: "departure",
      statement: "`at` is answered only where the file opened declared the id the row carries.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index names for a page that has gone is answered as no path at all.",
    },
    {
      invariantKind: "departure",
      statement: "`repo` is the checkout every `at` was read against, so a caller joins the two.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent page is keyed by the seat that ran it and the id it runs under.",
    },
    {
      invariantKind: "departure",
      statement: "Both of those keys are read off the page rather than off its file name.",
    },
    {
      invariantKind: "absence",
      statement: "Which subagents are running is not answered here.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes nothing.",
    },
  ],
} as const satisfies Command
