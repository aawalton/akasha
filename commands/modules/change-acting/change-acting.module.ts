import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const changeActing = {
  id: "01a07c62-0a71-737e-8955-3410b4a608bf",
  type: "module",
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
      statement: "A drop reaches the edits kept.",
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
      statement: "An act names each edit that went.",
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
      statement: "A listing of the edits kept names each edit and the call landing those edits.",
    },
    {
      invariantKind: "departure",
      statement:
        "The refusal an agent whose page is nowhere reads is worded here for every call over the edits kept.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal opens by naming the retry, which costs only the wait.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal says nothing was kept, so a retry loses nothing.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the log to read next before it explains anything.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal says how long the wait for the queued cause has run to.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names all three causes rather than the one that clears.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing refused for any reason but the lock or a put-back is retried by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that ended before it could say why is retried by nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "That refusal says the page is written again by the landing the next dispatch or resume runs.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal tells the agent to say it is refused to whoever dispatched it.",
    },
    {
      invariantKind: "absence",
      statement: "That refusal promises no outcome from waiting.",
    },
    {
      invariantKind: "absence",
      statement: "That refusal names no act the agent reading it is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no agent at all is refused without the retry.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal composed where no index answers is said without the retry.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent dispatched or resumed a moment ago can run before that page lands.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "A turn over the edits kept that would not open is an operational fault.",
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
