import type { Command } from "../../../command-system/commands/command.page-type.ts"

export const apply = {
  id: "01a07780-1fda-7906-b5d4-939967fa5b73",
  pageTypeSlug: "command",
  slug: "apply",
  definition: "the edits an agent has answered folded into one change and landed",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-authored",
  taking: [
    { said: "--message <text>", takes: "what the commit this makes is for" },
    { said: "--message-file <file>", takes: "a file that message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
  ],
  helpNotes: [
    "the edits `akasha change` appended are folded into one answer and landed.",
    "the folded edits leave the file holding them once the apply has landed.",
    "an apply that refuses puts the fold back, so the edits are kept for a change to mend.",
    "an edit for a body the apply writes again is dropped rather than folded, and the report names it.",
    "an apply over no edits applies nothing, as the fold of the edits is what an apply lands.",
    "--break-the-glass applies with no check run, and the reason is said in the commit.",
    "an apply says how many subagents handed edits over, because an apply lands none of them.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The edits beside the calling agent's page are folded into one answer.",
    },
    {
      invariantKind: "departure",
      statement: "A fold that refuses refuses the apply and leaves the edits as the edits were.",
    },
    {
      invariantKind: "departure",
      statement: "The folded answer is the change the apply lands.",
    },
    {
      invariantKind: "departure",
      statement: "The edits go once the apply has landed rather than once the fold has read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run stopping between the fold and the landing leaves the edits where the fold found the edits.",
    },
    {
      invariantKind: "departure",
      statement: "Only the rows the fold read go.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run stopping between the landing and the clearing leaves the edits for a later apply.",
    },
    {
      invariantKind: "departure",
      statement: "An edit re-folded onto the body a landing left takes nothing back out.",
    },
    {
      invariantKind: "departure",
      statement: "The edits are formatted after the edits are gathered rather than before.",
    },
    {
      invariantKind: "departure",
      statement: "A gather reads the body an earlier edit left.",
    },
    {
      invariantKind: "departure",
      statement: "Formatting first would leave the later edit reading another body.",
    },
    {
      invariantKind: "departure",
      statement: "A fold that made nothing is put back by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A row appended while the apply ran follows the rows put back.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row saying nothing of its readers leaves the readers of that path owing the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A row for a body written again on every apply is dropped rather than folded.",
    },
    {
      invariantKind: "departure",
      statement: "Every row dropped is named in the report.",
    },
    {
      invariantKind: "departure",
      statement: "A run holding nothing but such rows drops those rows and lands nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose writer owes reading is warranted before the edits are folded.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose writer owes no reading is passed over by that warrant.",
    },
    {
      invariantKind: "departure",
      statement: "A row saying nothing of its writer is warranted.",
    },
    {
      invariantKind: "departure",
      statement: "`--break-the-glass` passes the checks and passes no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "The checks run before the fold judge the bodies the apply would write.",
    },
    {
      invariantKind: "departure",
      statement: "A row worked out from an older body is merged onto the commit at HEAD first.",
    },
    {
      invariantKind: "departure",
      statement: "That merge is the merge the apply itself makes.",
    },
    {
      invariantKind: "departure",
      statement: "A merge that clashes runs no check here and is refused by the apply.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands.",
    },
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is the refusal `akasha change` gives.",
    },
    {
      invariantKind: "departure",
      statement: "The paths folded in are named in the report before the report the apply makes.",
    },
    {
      invariantKind: "absence",
      statement: "This command takes no dry run.",
    },
    {
      invariantKind: "gap",
      statement:
        "The edits fold under one running rather than the running each change's page states.",
    },
    {
      invariantKind: "departure",
      statement: "A fold and the apply following that fold are one act.",
    },
    {
      invariantKind: "departure",
      statement: "An apply that refuses puts the folded edits back where the fold found the edits.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the apply landed is read off the landing rather than off the refusals.",
    },
    {
      invariantKind: "departure",
      statement: "An apply that landed puts no fold back.",
    },
    {
      invariantKind: "absence",
      statement: "An apply lands no edit a subagent handed over.",
    },
    {
      invariantKind: "departure",
      statement: "An apply says how many subagents handed edits over.",
    },
  ],
} as const satisfies Command
