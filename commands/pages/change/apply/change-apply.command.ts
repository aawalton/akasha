import type { Command } from "akasha/commands/command.page-type.types.ts"

export const changeApply = {
  id: "01a08179-6ebf-724c-8698-aa6e02645d0e",
  type: "command",
  slug: "change-apply",
  definition: "the command landing every edit kept, answering one change first where one is named",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  timeout: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An apply naming no change lands the edits already kept.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments a change takes are piped in.",
    },
    {
      invariantKind: "departure",
      statement:
        "An argument is a line `key: value` or `key <fence>` opening a body `<fence>` alone closes.",
    },
    {
      invariantKind: "departure",
      statement: "An apply naming a change answers that change before landing.",
    },
    {
      invariantKind: "departure",
      statement: "An apply naming a change measures that landing where `measure` says so.",
    },
    {
      invariantKind: "departure",
      statement: "An apply lands every edit kept rather than the edits that run answered.",
    },
    {
      invariantKind: "departure",
      statement: "The key `draft` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The value at `message` says what the commit is for.",
    },
    {
      invariantKind: "departure",
      statement: "An apply naming no message composes the message.",
    },
    {
      invariantKind: "departure",
      statement: "A change that refuses lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the whole set of edits kept.",
    },
    {
      invariantKind: "departure",
      statement: "A check refusing leaves every edit kept where those edits are.",
    },
    {
      invariantKind: "departure",
      statement: "Why the apply refused is written beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "A word naming an act over the edits kept is read here as a change to answer.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "No flag is said on the command line.",
    },
    {
      invariantKind: "absence",
      statement: "No taking is stated here.",
    },
    {
      invariantKind: "departure",
      statement: "`break-the-glass` passes the checks.",
    },
    {
      invariantKind: "departure",
      statement: "The value at `break-the-glass` is why no check is to run.",
    },
    {
      invariantKind: "departure",
      statement: "The key `measure` runs the checks and lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A measuring apply holds no test file to a ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A measuring apply is allowed more seconds than this page states.",
    },
    {
      invariantKind: "departure",
      statement: "A measuring apply says what each test file the change names spent.",
    },
    {
      invariantKind: "departure",
      statement:
        "An apply naming no measure lands only where every test file is under the ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "A measuring apply with no test file refuses rather than landing.",
    },
    {
      invariantKind: "departure",
      statement: "What one apply run cost is appended beside this page.",
    },
    {
      invariantKind: "departure",
      statement: "An apply a change reached is recorded as a run of its own.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An apply's time tracks the test files beside the batch rather than the pages in it.",
    },
    {
      invariantKind: "departure",
      statement: "A landing may wrap a line the change wrote.",
    },
    {
      invariantKind: "departure",
      statement: "What lands is not always the text handed in.",
    },
    { invariantKind: "departure", statement: "An apply runs under no ceiling on the wall clock." },
    {
      invariantKind: "departure",
      statement: "A change past the processor seconds its page allows lands nothing.",
    },
  ],
  name: "apply",
} as const satisfies Command
