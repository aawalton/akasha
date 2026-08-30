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
        "A git write is refused unless the call names its paths and every one stands outside the akasha folder.",
    },
    {
      invariantKind: "departure",
      statement: "Only the paths after `--` bound a call.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the akasha command that does what was asked, with its flags filled in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the bounded form of the call, for a write that reaches no akasha path.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha command stands aside here, and commits for itself.",
    },
    {
      invariantKind: "departure",
      statement: "What this does not reach is printed by the hook, and asked for with `--scope`.",
    },
    {
      invariantKind: "absence",
      statement:
        "`rm`, `checkout` and `restore` are not named here, and `block-destructive-git` refuses every form of them.",
    },
    {
      invariantKind: "constraint",
      statement: "What a commit would carry is in the index, never on the command line.",
    },
    {
      invariantKind: "constraint",
      statement: "A shell writes a file in more ways than can be named, and this reads git alone.",
    },
    {
      invariantKind: "gap",
      statement: "A hand-written commit does not leave the index stamp behind HEAD.",
    },
  ],
} as const satisfies AgentHook
