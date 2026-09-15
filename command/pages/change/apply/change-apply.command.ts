import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeApply = {
  id: "01a08179-6ebf-724c-8698-aa6e02645d0e",
  type: "command",
  slug: "change-apply",
  definition: "the command landing every edit kept, answering one change first where one is named",
  code: "ts",
  test: "ts",
  maxWallSeconds: 900,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply naming no change lands the edits already kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments a change takes are piped in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An argument is a line `key: value` or `key <fence>` opening a body `<fence>` alone closes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply naming a change answers that change before landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply naming a change measures that landing where `measure` says so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply lands every edit kept rather than the edits that run answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key `draft` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value at `message` says what the commit is for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply naming no message composes the message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change that refuses lands nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checks judge the whole set of edits kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check refusing leaves every edit kept where those edits are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Why the apply refused is written beside the calling agent's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A word naming an act over the edits kept is read here as a change to answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No flag other than the help flag is said on the command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is answered with what an apply does and what an apply takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is read before the arguments are, so nothing need be piped in.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement: "`break-the-glass` passes the checks.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value at `break-the-glass` is why no check is to run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key `measure` runs the checks and lands nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A measuring apply holds no test file to a ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A measuring apply is allowed more seconds than this page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A measuring apply says what each test file the change names spent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An apply naming no measure lands only where every test file is under the ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A measuring apply with no test file refuses rather than landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What one apply run cost is appended beside this page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply a change reached is recorded as a run of its own.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "An apply's time tracks the test files beside the batch rather than the pages in it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing may wrap a line the change wrote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What lands is not always the text handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply is ended at the ceiling on the wall clock its page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An apply ended that way lands nothing and says nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change past the processor seconds its page allows lands nothing.",
    },
  ],
  name: "apply",
  arguments: [{ argument: "argument/change", saidAs: "word" }],
} as const satisfies Command
