import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockGitWrites = {
  id: "01a04e16-d380-7003-9da6-e715140d0718",
  type: "page-type/agent-hook",
  slug: "block-git-writes",
  definition: "a refusal of the git calls that write tracked akasha content outside the commands",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  invariants: [
    {
      invariantKind: "invariant-kind/gap",
      statement: "A git write is refused unless the line proves the call cannot reach akasha.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A git write in the command word is refused unless the line gives that proof.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A flag that writes nothing is that proof.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `-C` path resolving to another repository is that proof.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing else on a line is that proof.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal names the akasha command that does the git write asked for with its flags filled in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An akasha command stands aside here and commits for itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a git write from this hook.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No pathspec on the line lets a git write through.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A refusal prescribes no bounded form of the call that refusal refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`rm` is not named here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`checkout` is not named here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`restore` is not named here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`block-destructive-git` names `rm`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`block-destructive-git` names `checkout`.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "`block-destructive-git` names `restore`.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "An act left to `block-destructive-git` is refused in every form the act is written in.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Every path the akasha repository tracks is akasha content.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The akasha repository is checked out outside the akasha folder as well as inside it.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Two checkouts sharing one git folder are one repository under two toplevels.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Where a call runs is on the line only where `-C` puts it there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A `-C` path is resolved through its symlinks before a repository is read from it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Several `-C` on one line accumulate, each against the one before it.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A `-C` path that resolves to no other repository is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A relative `-C` path proves nothing, because the cwd is not on the line.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A line carrying a global flag before the act other than `-C` proves nothing.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The paths a commit would carry are in the index rather than on the command line.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A shell writes a file in more ways than can be named.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "This hook reads git alone.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A hand-written commit does not leave the index stamp behind HEAD.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A read flag is read as a flag rather than as another flag's value.",
    },
  ],
} as const satisfies AgentHook
