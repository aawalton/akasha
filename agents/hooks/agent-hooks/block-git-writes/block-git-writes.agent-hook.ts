import type { AgentHook } from "akasha/agents/hooks/agent-hooks/agent-hook.page-type.types.ts"

export const blockGitWrites = {
  id: "01a04e16-d380-7003-9da6-e715140d0718",
  type: "agent-hook",
  slug: "block-git-writes",
  definition: "a refusal of the git calls that write tracked akasha content outside the commands",
  code: "ts",
  test: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "gap",
      statement: "A git write is refused unless the call has a flag that writes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A git write in the command word is refused unless the call has a flag that writes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the akasha command that does the git write asked for with its flags filled in.",
    },
    {
      invariantKind: "departure",
      statement: "An akasha command stands aside here and commits for itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a git write from this hook.",
    },
    {
      invariantKind: "absence",
      statement: "No pathspec on the line lets a git write through.",
    },
    {
      invariantKind: "absence",
      statement: "A refusal prescribes no bounded form of the call that refusal refused.",
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
      statement: "`block-destructive-git` names `rm`.",
    },
    {
      invariantKind: "absence",
      statement: "`block-destructive-git` names `checkout`.",
    },
    {
      invariantKind: "absence",
      statement: "`block-destructive-git` names `restore`.",
    },
    {
      invariantKind: "gap",
      statement:
        "An act left to `block-destructive-git` is refused in every form the act is written in.",
    },
    {
      invariantKind: "constraint",
      statement: "The repository root is the akasha folder.",
    },
    {
      invariantKind: "constraint",
      statement: "Every path the repository tracks is akasha content.",
    },
    {
      invariantKind: "constraint",
      statement: "The paths a commit would carry are in the index rather than on the command line.",
    },
    {
      invariantKind: "constraint",
      statement: "A shell writes a file in more ways than can be named.",
    },
    {
      invariantKind: "constraint",
      statement: "This hook reads git alone.",
    },
    {
      invariantKind: "gap",
      statement: "A hand-written commit does not leave the index stamp behind HEAD.",
    },
    {
      invariantKind: "gap",
      statement: "A read flag read as another flag's value lets the call through.",
    },
  ],
} as const satisfies AgentHook
