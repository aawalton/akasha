import type { Module } from "@akasha/code/module"

export const applyRunning = {
  id: "01a081bf-3b4f-7261-8bf7-fae03d26357a",
  pageTypeSlug: "module",
  type: "module",
  slug: "apply-running",
  definition: "the edits an agent has answered folded into one change and landed",
  code: "ts",
  test: "ts",
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
      invariantKind: "gap",
      statement:
        "Nothing says a body the fold formatted was formatted, as the apply says only its own.",
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
      statement: "Which bodies those are is read from the index rather than from the path's name.",
    },
    {
      invariantKind: "departure",
      statement: "A row for a body nothing writes again is folded like any other row.",
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
      invariantKind: "absence",
      statement: "No warrant runs here, as a change is warranted where that change is made.",
    },
    {
      invariantKind: "departure",
      statement: "A row reaching an apply was warranted against the record its writer had.",
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
      invariantKind: "departure",
      statement: "The paths folded in are named in the report before the report the apply makes.",
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
    {
      invariantKind: "departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal is the refusal every call running a change gives.",
    },
    {
      invariantKind: "departure",
      statement: "The writer owes a reading where any row a fold holds says the writer owes one.",
    },
    {
      invariantKind: "gap",
      statement: "No row says whether the checks run, so a fold runs every check.",
    },
    {
      invariantKind: "departure",
      statement: "What one apply run cost is appended beside the page of the command that ran.",
    },
  ],
} as const satisfies Module
