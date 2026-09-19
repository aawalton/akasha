import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const shellClean = {
  id: "01a05991-d997-76f5-a619-6ddb7444c34f",
  type: "page-type/check-code",
  slug: "shell-clean",
  definition: "the check refusing a change shellcheck finds fault in",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The shell scripts a change is judged by are the ones the change has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Audit is handed every shell script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The same reading covers one change and the whole tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Neither phase is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The linter reads a mirror written out of the bodies the change proposes rather than the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mirror has every shell script the tree has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mirror has no index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The linter reads no index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script outside the mirror is a script the linter cannot follow a source into.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Every finding is answered against the file the finding is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The findings are answered in the order the findings are in the files.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The order the linter printed its findings in follows nothing a reader could name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the change takes away is judged by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A finding is said as the `SC` code the linter gave the finding.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The reason a finding is said with names no file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names the faults the linter looks for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The linter itself judges which findings bind.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing is fixed.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The mirror is swept whatever the linter said.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The mirror's root is taken out of the reason reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The linter is on the host rather than among the declared dependencies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine without the linter cannot land a change carrying a shell script.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The answer for a missing linter names the linter rather than a fault in the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run the linter could not look in is unmeasured rather than refusing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Only shell scripts are judged.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 60 },
} as const satisfies CheckCode
