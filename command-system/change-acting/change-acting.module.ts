import type { Module } from "@akasha/code/module"

export const changeActing = {
  id: "01a07c62-0a71-737e-8955-3410b4a608bf",
  pageTypeSlug: "module",
  slug: "change-acting",
  definition: "the acts run over the edits kept rather than over a change",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act here names no change and runs no change.",
    },
    {
      invariantKind: "departure",
      statement: "An act reaches the edits kept beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "How one edit is said in a report is worded here rather than by each act.",
    },
    {
      invariantKind: "departure",
      statement: "One reading of the lines piped in serves every act that names paths.",
    },
    {
      invariantKind: "departure",
      statement: "An act words its own refusals rather than borrowing another act's words.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming paths reads each path against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming paths leaves every edit no path named.",
    },
    {
      invariantKind: "departure",
      statement: "An act piping nothing in is refused rather than reaching every edit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path naming no edit an act reaches refuses that act rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A drop reaches the edits kept, and a take and a forget the edits handed over.",
    },
    {
      invariantKind: "departure",
      statement: "A drop leaves every edit a subagent handed over.",
    },
    {
      invariantKind: "departure",
      statement: "An act saying `all: true` reaches every edit that act reaches.",
    },
    {
      invariantKind: "departure",
      statement: "`all` takes `true` and no other value.",
    },
    {
      invariantKind: "departure",
      statement: "An act names each edit that went, because nothing puts one back.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming paths says how many edits are still there.",
    },
    {
      invariantKind: "departure",
      statement: "An edit a move left behind is reached by the path that move came from.",
    },
    {
      invariantKind: "departure",
      statement: "A drop saying `all: true` over no edit kept says so rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A take folds the handed edits it names into the edits this agent keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A take that would not fold refuses and leaves both sets where those sets were.",
    },
    {
      invariantKind: "departure",
      statement: "A take that folds takes away the handed edits that were folded in.",
    },
    {
      invariantKind: "departure",
      statement:
        "An act reaching handed edits and naming no subagent is refused rather than reaching all.",
    },
    {
      invariantKind: "departure",
      statement: "The edits a subagent handed over are kept apart from the edits this agent keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A listing of the edits kept names each edit and the call landing those edits.",
    },
    {
      invariantKind: "departure",
      statement: "That listing names each subagent holding edits for this agent.",
    },
    {
      invariantKind: "departure",
      statement: "A listing of one subagent's handed edits names each of those edits.",
    },
    {
      invariantKind: "departure",
      statement: "How a subagent's handed edits are counted is worked out in one place.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an argument off the command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands.",
    },
  ],
} as const satisfies Module
