import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const shellClean = {
  id: "01a05991-d997-76f5-a619-6ddb7444c34f",
  type: "code-check",
  slug: "shell-clean",
  definition: "the check refusing a change shellcheck finds fault in",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The shell scripts a change is judged by are the ones the change has.",
    },
    {
      invariantKind: "departure",
      statement: "Audit is handed every shell script.",
    },
    {
      invariantKind: "departure",
      statement: "The same reading covers one change and the whole tree.",
    },
    {
      invariantKind: "departure",
      statement: "Neither phase is named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The linter reads a mirror written out of the bodies the change proposes rather than the tree.",
    },
    {
      invariantKind: "departure",
      statement: "The mirror has every shell script the tree has.",
    },
    {
      invariantKind: "departure",
      statement: "The mirror has no index.",
    },
    {
      invariantKind: "absence",
      statement: "The linter reads no index.",
    },
    {
      invariantKind: "departure",
      statement: "A script outside the mirror is a script the linter cannot follow a source into.",
    },

    {
      invariantKind: "departure",
      statement: "Every finding is answered against the file the finding is in.",
    },
    {
      invariantKind: "departure",
      statement: "The findings are answered in the order the findings are in the files.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The order the linter printed its findings in follows nothing a reader could name.",
    },
    {
      invariantKind: "departure",
      statement: "A file the change takes away is judged by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A finding is said as the `SC` code the linter gave the finding.",
    },
    {
      invariantKind: "absence",
      statement: "The reason a finding is said with names no file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names the faults the linter looks for.",
    },
    {
      invariantKind: "absence",
      statement: "The linter itself judges which findings bind.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is fixed.",
    },
    {
      invariantKind: "constraint",
      statement: "The mirror is swept whatever the linter said.",
    },
    {
      invariantKind: "constraint",
      statement: "The mirror's root is taken out of the reason reported.",
    },
    {
      invariantKind: "departure",
      statement: "The linter is on the host rather than among the declared dependencies.",
    },
    {
      invariantKind: "departure",
      statement: "A machine without the linter cannot land a change carrying a shell script.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal for a missing linter names the linter rather than a fault in the change.",
    },
    {
      invariantKind: "absence",
      statement: "Only shell scripts are judged.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
