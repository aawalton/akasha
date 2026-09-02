import type { AgentHook } from "../agent-hook.page-type.ts"

export const blockGitWrites = {
  id: "01a04e16-d380-7003-9da6-e715140d0718",
  pageTypeSlug: "agent-hook",
  slug: "block-git-writes",
  definition: "a refusal of the git calls that write tracked akasha content outside the commands",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A git write is refused unless the call names its paths and every path sits outside `akasha/`.",
    },
    {
      invariantKind: "departure",
      statement: "Only the paths after `--` bound a call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the akasha command that does what was asked with its flags filled in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the bounded form of the call for a write that reaches no akasha path.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha command stands aside here and commits for itself.",
    },
    {
      invariantKind: "departure",
      statement: "A prefix that only runs the call behind it does not hide a git write from this.",
    },
    {
      invariantKind: "absence",
      statement: "`rm` is not named here.",
    },
    {
      invariantKind: "absence",
      statement: "`checkout` is not named here.",
    },
    {
      invariantKind: "absence",
      statement: "`restore` is not named here.",
    },
    {
      invariantKind: "absence",
      statement: "`block-destructive-git` refuses every form of `rm`.",
    },
    {
      invariantKind: "absence",
      statement: "`block-destructive-git` refuses every form of `checkout`.",
    },
    {
      invariantKind: "absence",
      statement: "`block-destructive-git` refuses every form of `restore`.",
    },
    {
      invariantKind: "constraint",
      statement: "What a commit would carry is in the index rather than on the command line.",
    },
    {
      invariantKind: "constraint",
      statement: "A shell writes a file in more ways than can be named.",
    },
    {
      invariantKind: "constraint",
      statement: "This reads git alone.",
    },
    {
      invariantKind: "gap",
      statement: "A hand-written commit does not leave the index stamp behind HEAD.",
    },
  ],
} as const satisfies AgentHook
