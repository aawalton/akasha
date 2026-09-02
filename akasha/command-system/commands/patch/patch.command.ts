import type { Command } from "../command.page-type.ts"

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
    { said: "--message <text>", takes: "what the commit an apply makes is for" },
    { said: "--message-file <file>", takes: "a file that message is read from" },
  ],
  helpNotes: [
    "a call naming no act says what the patch holds and changes nothing.",
    "a patch is kept beside the page of the agent drafting it, and one agent drafts into one patch.",
    "an apply rebases the patch onto the commit at HEAD before the checks judge what the patch leaves.",
    "a path the patch and HEAD hold alike was read when it was drafted, so no fresh read is asked for.",
    "a path that moved under the patch is refused until the agent reads what moved there.",
    "an apply the checks refuse leaves the patch to be worked on further.",
    "a patch applied or dropped takes the ref keeping its blobs with it.",
    "a patch outlives a context replacement, which takes away every reading the agent held.",
    "a conflict the rebase leaves is carried into the patch for the agent to resolve.",
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
      statement: "A path that moved under the patch is named as moved.",
    },
    {
      invariantKind: "departure",
      statement: "A path the patch carries a conflict at is named as carrying one.",
    },
  ],
} as const satisfies Command
