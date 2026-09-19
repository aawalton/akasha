import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeApply = {
  id: "01a08179-6ebf-724c-8698-aa6e02645d0e",
  type: "page-type/command",
  slug: "change-apply",
  definition:
    "the command answering one change where one is named, then landing the edits kept or keeping them",
  code: "ts",
  test: "ts",
  maxWallSeconds: 900,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply naming no change lands the edits already kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The arguments a change takes are piped in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An argument is a line `key: value` or `key <fence>` opening a body `<fence>` alone closes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The fence is the caller's to pick.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body opened `key <fence> no-newline` keeps no newline on its last line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key `at` names a path, read against the repository root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply naming a change answers that change before landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply naming a change measures that landing where `measure` says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply lands every edit kept rather than the edits that run answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--draft` keeps the edits the change answered rather than landing them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting apply lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting apply naming no change is refused rather than reaching every change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names every change this command runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting apply names where the edits are kept and the call that lands them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two drafting applies leave two sets of edits in the order the runs were made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Under `--draft` the key `message` is refused rather than carried into a commit that is not made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Under `--draft` the key `measure` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting apply that refuses keeps nothing and says why that apply refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No check runs under `--draft`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key `draft` is refused, and `--draft` is where a call says it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value at `message` says what the commit is for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply naming no message composes the message.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change that refuses lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The checks judge the whole set of edits kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check refusing leaves every edit kept where those edits are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Why the apply refused is written beside the calling agent's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word naming an act over the edits kept is read here as a change to answer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The edits the change answered are kept beside the calling agent's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change is handed the world the edits kept before that change leave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change whose writer owes reading is refused before that change's edits are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer names every page written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply that threw after keeping its edits names those edits in its refusal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply that threw before keeping anything says nothing of what it kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply names each thing it did in the order it did them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No redirect carries that answer to a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No flag other than `--draft` and the help flag is said on the command line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The help flag is answered with what an apply does and what an apply takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The help flag is read before the arguments are, so nothing need be piped in.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "`break-the-glass` passes the checks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value at `break-the-glass` is why no check is to run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key `measure` runs the checks and lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A measuring apply holds no test file to a ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A measuring apply is allowed more seconds than this page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A measuring apply says what each test file the change names spent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An apply naming no measure lands only where every test file is under the ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A measuring apply with no test file refuses rather than landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What one apply run cost is appended beside this page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply a change reached is recorded as a run of its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An apply's time tracks the test files beside the batch rather than the pages in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landing may wrap a line the change wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What lands is not always the text handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply is ended at the ceiling on the wall clock its page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An apply ended that way lands nothing and says nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change past the processor seconds its page allows lands nothing.",
    },
  ],
  name: "apply",
  arguments: [{ argument: "argument/change", saidAs: "word" }, { argument: "argument/draft" }],
} as const satisfies Command
