import type { AgentHook } from "akasha/agent/hook/agent-hook/agent-hook.page-type.types.ts"

export const blockGitWrites = {
  id: "01a04e16-d380-7003-9da6-e715140d0718",
  type: "page-type/agent-hook",
  slug: "block-git-writes",
  definition: "a refusal of the git commands that write akasha files outside the akasha commands",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsAt: ["PreToolUse"],
  overTools: ["Bash"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A git write the line holds is refused unless the line proves the call cannot reach akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag that writes nothing is that proof.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `-C` path resolving to another repository is that proof.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing else on a line is that proof.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal names the akasha command that does the git write asked for with its flags filled in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An akasha command stands aside here and commits for itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A prefix that only runs the call behind that prefix does not hide a git write from this hook.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No pathspec on the line lets a git write through.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A refusal prescribes no bounded form of the call that refusal refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`rm` is not named here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`checkout` is not named here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`restore` is not named here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`block-destructive-git` names `rm`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`block-destructive-git` names `checkout`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "`block-destructive-git` names `restore`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An act left to `block-destructive-git` is refused in every form the act is written in.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every path the akasha repository tracks is akasha content.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The akasha repository is checked out outside the akasha folder as well as inside it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two checkouts sharing one git folder are one repository under two toplevels.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Where a call runs is on the line only where `-C` puts it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `-C` path is resolved through its symlinks before a repository is read from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Several `-C` on one line accumulate, each against the one before it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `-C` path that resolves to no other repository is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A relative `-C` path proves nothing, because the cwd is not on the line.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A line carrying a global flag before the act other than `-C` proves nothing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The paths a commit would carry are in the index rather than on the command line.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A shell writes a file in more ways than can be named.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "This hook reads git alone.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A read flag is taken as a flag rather than as another flag's value.",
    },
  ],
} as const satisfies AgentHook
