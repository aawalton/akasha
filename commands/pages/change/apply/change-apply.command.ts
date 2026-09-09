import type { Command } from "../../../command.page-type.ts"

export const changeApply = {
  id: "01a08179-6ebf-724c-8698-aa6e02645d0e",
  pageTypeSlug: "command",
  type: "command",
  slug: "change-apply",
  definition: "the command landing every edit kept, answering one change first where one is named",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  helpNotes: [
    "an apply naming no change lands the edits already kept beside this agent's page.",
    "an apply naming a change answers that change first, then lands every edit kept, and `measure` measures that landing rather than landing it.",
    "the arguments a change takes are piped in, as they are for a draft.",
    "an argument is a line `key: value`, or `key <fence>` opening a body that `<fence>` alone closes.",
    "nothing on the command line carries a value, so no shell reads a quote or a backslash.",
    "`message` says what the commit is for, and an apply naming none composes the message.",
    "`draft` is refused here, because an apply lands rather than keeps.",
    "an apply lands every edit kept rather than the edits this run answered alone.",
    "the checks judge the whole set of edits kept as that apply lands them.",
    "an apply the checks refused leaves every edit kept, and that is the dry run.",
    "why the apply refused is written beside this agent's page, whole.",
    "`break-the-glass` says why no check is to run, and the reason is written into the commit.",
    "`measure` runs the checks, holds no test file to a ceiling, is allowed more seconds than this page states, says what each spent, and lands nothing.",
    "the edits `akasha change draft` kept are folded into one answer and landed.",
    "an apply that refuses puts the fold back, so the edits are kept for a change to mend.",
    "an edit for a body the apply writes again is dropped rather than folded, and the report names it.",
    "an apply says how many subagents handed edits over, because an apply lands none of them.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An apply naming no change lands the edits already kept.",
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
      statement: "The key `draft` is refused, as an apply lands rather than keeps.",
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
  ],
} as const satisfies Command
