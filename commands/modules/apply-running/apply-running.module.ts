import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const applyRunning = {
  id: "01a081bf-3b4f-7261-8bf7-fae03d26357a",
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
      statement: "A body the fold formatted is said to have been formatted.",
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
      statement: "No warrant runs here.",
    },
    {
      invariantKind: "departure",
      statement: "A row reaching an apply was warranted against the record its writer had.",
    },
    {
      invariantKind: "departure",
      statement: "A row is replayed onto the commit at HEAD rather than onto the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A row that will not replay there refuses the apply and runs no check.",
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
      statement: "A row says whether the checks run.",
    },
    {
      invariantKind: "departure",
      statement: "A fold runs every check.",
    },
    {
      invariantKind: "departure",
      statement: "What one apply run cost is appended beside the page of the command that ran.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments are read once, and the apply is handed what that reading answered.",
    },
    {
      invariantKind: "departure",
      statement: "An apply whose arguments the reading refused folds nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A landing moving the file a hook link points at writes that link again.",
    },
    {
      invariantKind: "departure",
      statement: "A link already reaching the file the link names is left alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mend that failed is said beside the apply's refusals rather than stopping the apply.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mend follows the landing, so the run that moved the file is the run that mends.",
    },
    {
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "departure",
      statement: "An apply answers with the code the applying it ran refused with.",
    },
    {
      invariantKind: "departure",
      statement: "A fold that refuses carries the kind of fault that refusal is.",
    },
    {
      invariantKind: "departure",
      statement: "An apply answers a refused fold with the kind that fold carried.",
    },
    {
      invariantKind: "departure",
      statement: "A fold the kept edits or the bodies beneath refuse is a fault of the data.",
    },
  ],
} as const satisfies Module
