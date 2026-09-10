import type { Module } from "@akasha/code/module"

export const changeRunning = {
  id: "01a0818f-bf8a-746c-8cff-6a16f214e396",
  pageTypeSlug: "module",
  type: "module",
  slug: "change-running",
  definition: "one mechanical change run for the edits it answers",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The change to run is named by the first word of the call.",
    },
    {
      invariantKind: "departure",
      statement: "A change is reached by its address rather than by a name held here.",
    },
    {
      invariantKind: "departure",
      statement: "A word naming no change is refused by that word rather than by an address.",
    },
    {
      invariantKind: "departure",
      statement: "The change is loaded before the turn over the edits is taken.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments a change takes are read from standard input.",
    },
    {
      invariantKind: "departure",
      statement: "A call piping nothing in is refused rather than run with no argument.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value with a quote or a newline reaches the change as the caller wrote that value.",
    },
    {
      invariantKind: "departure",
      statement: "The key `at` names a path.",
    },
    {
      invariantKind: "departure",
      statement: "A path is read against the repository root here rather than by the change.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the repository is refused before the change is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The value at `message` says what the commit is for.",
    },
    {
      invariantKind: "departure",
      statement: "The key `message` is read here rather than handed to the change.",
    },
    {
      invariantKind: "departure",
      statement: "An empty `message` is refused before the change is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The key `draft` keeps the edits for a later apply rather than applying.",
    },
    {
      invariantKind: "departure",
      statement: "`draft` takes `true` or `false` and no other value.",
    },
    {
      invariantKind: "departure",
      statement: "`draft` beside `message` is refused before the change is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The key `draft` is read here rather than handed to the change.",
    },
    {
      invariantKind: "departure",
      statement: "The key `measure` measures the landing the change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "`measure` takes `true` and no other value.",
    },
    {
      invariantKind: "departure",
      statement: "`measure` beside `draft` is refused before the change is loaded.",
    },
    {
      invariantKind: "departure",
      statement: "The key `measure` is read here rather than handed to the change.",
    },
    {
      invariantKind: "departure",
      statement: "A caller settling what a run does with its edits bars the keys saying otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A run keeping its edits names where they are kept and the apply landing them.",
    },
    {
      invariantKind: "departure",
      statement: "The edits a change answers are appended beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every edit appended carries whether the readers of that path owe the reading again.",
    },
    {
      invariantKind: "departure",
      statement: "That answer is read off the change kind the change's page names.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change page reaching nothing leaves the readers of every path owing the reading.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the command putting a subagent's page up.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent dispatched a moment ago can run before that page lands.",
    },
    {
      invariantKind: "departure",
      statement: "Two runs leave two sets of edits in the order the runs were made.",
    },
    {
      invariantKind: "departure",
      statement: "A change is handed the world the edits appended before that change leave.",
    },
    {
      invariantKind: "departure",
      statement: "The edits appended before are folded into one answer to work that world out.",
    },
    {
      invariantKind: "departure",
      statement: "A fold that refuses refuses the run rather than being read as an empty world.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refuses appends nothing and says why the change refused.",
    },
    {
      invariantKind: "departure",
      statement: "A world whose shadow will not build refuses the run.",
    },
    {
      invariantKind: "departure",
      statement: "A path a folder sits at holds no body, so a change reads that path as empty.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are read and appended to under one turn over the file the edits fill.",
    },
    {
      invariantKind: "departure",
      statement: "A change answering says how many subagents are holding edits for this agent.",
    },
    {
      invariantKind: "departure",
      statement: "No check runs over the change itself.",
    },
    {
      invariantKind: "departure",
      statement: "What one run of one change cost is appended beside the page the caller names.",
    },
    {
      invariantKind: "departure",
      statement: "The cost is taken around the change rather than around the apply that follows.",
    },
    {
      invariantKind: "departure",
      statement: "A run refused before the change is reached is recorded nowhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change whose writer owes reading is refused before that change's edits are appended.",
    },
    {
      invariantKind: "departure",
      statement: "The reading a writer owes is asked for at the change rather than at the apply.",
    },
    {
      invariantKind: "departure",
      statement: "A change whose writer owes no reading is passed over by that warrant.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refuses applies nothing and lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refuses writes no body onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "An apply lands every edit kept rather than the edits that run appended.",
    },
    {
      invariantKind: "departure",
      statement: "A call that applied says nothing of the edits being kept for a later apply.",
    },
    {
      invariantKind: "departure",
      statement: "An apply that refuses leaves the edits kept and names what lands them.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no change is refused with every change the index has.",
    },
  ],
} as const satisfies Module
