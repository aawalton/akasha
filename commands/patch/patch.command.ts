import type { Command } from "../../command-system/commands/command.page-type.ts"

export const patch = {
  id: "01a06455-7c20-7b41-8e93-2f5a7d0c1e84",
  pageTypeSlug: "command",
  slug: "patch",
  definition: "the command acting on the patch an agent is drafting into",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-authored",
  taking: [
    { said: "apply", takes: "the act, which is to land the patch through the gate as one commit" },
    { said: "drop", takes: "the act, which is to take the patch away without landing it" },
    { said: "show", takes: "the act, which is to say the body the patch would leave at one path" },
    { said: "resolve", takes: "the act, which is to replace the body the patch holds at one path" },
    { said: "--file-path <path>", takes: "the path a show or a resolve acts on" },
    { said: "--content-file <file>", takes: "a file the body for a resolve is read from" },
    { said: "--message <text>", takes: "what the commit an apply makes is for" },
    { said: "--message-file <file>", takes: "a file that message is read from" },
    { said: "--break-the-glass <reason>", takes: "why no check runs, said in the commit" },
  ],
  helpNotes: [
    "a call naming no act says what the patch holds and changes nothing.",
    "a patch is kept beside the page of the agent drafting it, and one agent drafts into one patch.",
    "an apply rebases the patch onto the commit at HEAD before the checks judge what the patch leaves.",
    "a path the patch and HEAD hold alike was read when it was drafted, so no fresh read is asked for.",
    "a path that moved under the patch is refused until the agent reads what moved there.",
    "an apply the checks refuse leaves the patch to be worked on further.",
    "--break-the-glass applies the patch with no check run, and the reason is said in the commit.",
    "a patch applied or dropped takes the ref keeping its blobs with it.",
    "a patch file is committed as it is drafted into, and what it draws is landed only by an apply.",
    "a call finding no patch beside a subagent's page names the seat that draft would have gone to.",
    "a patch outlives a context replacement, which takes away every reading the agent held.",
    "a conflict the rebase leaves is carried into the patch for the agent to resolve.",
    "a read says the body at HEAD, so a show is what says the body the patch would leave.",
    "a resolve reads the body from standard input unless --content-file names a file.",
    "a body handed to a resolve replaces what the patch held rather than merging onto that body.",
    "a body still carrying conflict marks is refused, so no patch applies half resolved.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no act says what the patch holds.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no act changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The act is the first word.",
    },
    {
      invariantKind: "departure",
      statement: "A word this command carries no act for is refused rather than read as a flag.",
    },
    {
      invariantKind: "departure",
      statement: "The patch acted on is the patch beside the page of the agent that called.",
    },
    {
      invariantKind: "departure",
      statement: "An agent naming no page is refused rather than answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An apply is judged by the checks that judge any authored change.",
    },
    {
      invariantKind: "departure",
      statement: "An apply the checks refused leaves the patch where the patch is.",
    },
    {
      invariantKind: "departure",
      statement: "A drop takes the patch away without judging what the patch holds.",
    },
    {
      invariantKind: "departure",
      statement: "A drop where no patch is kept is no fault.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call finding no patch says where a subagent's draft goes when the subagent stops.",
    },
    {
      invariantKind: "departure",
      statement: "That answer names the seat holding what this subagent drafted before.",
    },
    {
      invariantKind: "departure",
      statement: "A path that moved under the patch is named as moved.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch carries a conflict at is named as carrying one.",
    },
    {
      invariantKind: "departure",
      statement: "A show says the body the patch would leave rather than the body at HEAD.",
    },
    {
      invariantKind: "departure",
      statement: "A show rebases the patch onto the commit at HEAD before saying a body.",
    },
    {
      invariantKind: "departure",
      statement: "An apply naming `--break-the-glass` runs no check.",
    },
    {
      invariantKind: "departure",
      statement: "The reason the glass was broken is said in the commit an apply makes.",
    },
    {
      invariantKind: "departure",
      statement: "An apply naming the glass says in the report that no check ran.",
    },
    {
      invariantKind: "departure",
      statement: "Checks that will not load stop an apply unless the glass is broken.",
    },
    {
      invariantKind: "departure",
      statement: "A resolve replaces the body the patch holds at the path the resolve names.",
    },
    {
      invariantKind: "departure",
      statement: "A resolve is judged by the checks that judge any authored change.",
    },
    {
      invariantKind: "departure",
      statement: "A body resolved is formatted before the checks judge that body.",
    },
    {
      invariantKind: "departure",
      statement: "A body still carrying conflict marks is refused rather than resolved.",
    },
    {
      invariantKind: "departure",
      statement: "A show or a resolve naming no path is refused.",
    },
  ],
} as const satisfies Command
