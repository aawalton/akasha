import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const lintClean = {
  id: "01a04eec-d235-7000-9f19-d65076b0c634",
  type: "page-type/check-code",
  slug: "lint-clean",
  definition: "the check refusing a change the linter finds fault in",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The files a change is judged by are the ones the change has.",
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
        "The linter reads a mirror written out of the files the change proposes rather than the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mirror has those files and the files the linter is configured by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The mirror is named to the linter as one folder rather than as every path in the mirror.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is named the same way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The linter finds the files under the tree itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Naming every path costs the linter more than finding those paths for itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file the tree ignores is left by the linter reading that ignore rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The linter judges its own config there beside the files the change has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The linter itself is found under the tree rather than in the mirror.",
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
      statement: "The linter reads each file on its own and follows no import out of that file.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Every finding is answered against the file the finding is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the linter could not open is no finding in that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every path the linter could not open is answered as one run that fell short.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that fell short says so rather than naming a file at fault.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The tree an audit reads is live, so a path can go while the linter walks it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that can go while the tree is read is judged by no reading of the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages that can go are the pages of every page type stating it is mortal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which folders those are is read from the page types rather than named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mirror a change is judged in judges those pages as it judges any other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit reads no body to find which files the linter reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the change takes away is judged by nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which rules the linter looks for.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The linter's own configuration settles which rules bind.",
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
      statement: "The mirror's root is taken out of every reason reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stylesheet is judged as readily as a body of TypeScript.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Only the files the linter is configured to read are judged.",
    },
  ],
  check: { maxCpuSeconds: 60 },
  audit: { maxCpuSeconds: 420 },
} as const satisfies CheckCode
