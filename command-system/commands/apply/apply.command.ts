import type { Command } from "../command.page-type.ts"

export const apply = {
  id: "01a07780-1fda-7906-b5d4-939967fa5b73",
  pageTypeSlug: "command",
  slug: "apply",
  definition: "the edits an agent has answered compiled into that agent's patch and landed",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-authored",
  taking: [
    { said: "--message <text>", takes: "what the commit this makes is for" },
    { said: "--message-file <file>", takes: "a file that message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
  ],
  helpNotes: [
    "the edits `akasha change` appended are folded into one answer and drafted into this agent's patch.",
    "a patch this agent already holds takes the folded edits in rather than being written over.",
    "the folded edits leave the file holding them once the patch carries the edits.",
    "an apply is the apply `akasha patch apply` runs, so the checks, the commit and the record are the same.",
    "a fold the patch refuses leaves the edits where the edits are.",
    "an apply that refuses puts the fold back, so the edits are kept for a change to mend.",
    "an apply over no edits applies the patch the agent already holds.",
    "--break-the-glass applies with no check run, and the reason is said in the commit.",
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
      statement: "The folded answer is drafted into the patch the agent already holds.",
    },
    {
      invariantKind: "departure",
      statement: "An edit naming the path that edit came from is drafted as two paths.",
    },
    {
      invariantKind: "departure",
      statement: "The path a move came from is drafted as holding no body.",
    },
    {
      invariantKind: "departure",
      statement: "The edits go once the patch carries the bodies the edits state.",
    },
    {
      invariantKind: "departure",
      statement: "A draft the patch refuses leaves the edits where the edits are.",
    },
    {
      invariantKind: "departure",
      statement: "The patch is applied by the act `akasha patch apply` runs.",
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
      statement: "The patch is put back as that patch stood before the fold.",
    },
    {
      invariantKind: "departure",
      statement: "Whether the apply landed is read off the patch rather than off the refusals.",
    },
    {
      invariantKind: "departure",
      statement: "An apply that landed leaves the fold standing.",
    },
  ],
} as const satisfies Command
