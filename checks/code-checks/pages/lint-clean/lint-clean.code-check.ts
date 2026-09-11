import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const lintClean = {
  id: "01a04eec-d235-7000-9f19-d65076b0c634",
  type: "code-check",
  slug: "lint-clean",
  definition: "the check refusing a change the linter finds fault in",
  runsOnChange: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The files a change is judged by are the ones the change has.",
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
        "The linter reads a mirror written out of the files the change proposes rather than the tree.",
    },
    {
      invariantKind: "departure",
      statement: "The mirror has those files and the files the linter is configured by.",
    },
    {
      invariantKind: "departure",
      statement:
        "The mirror is named to the linter as one folder rather than as every path in the mirror.",
    },
    {
      invariantKind: "departure",
      statement: "The tree is named the same way.",
    },
    {
      invariantKind: "departure",
      statement: "The linter finds the files under the tree itself.",
    },
    {
      invariantKind: "departure",
      statement: "Naming every path costs the linter more than finding those paths for itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the tree ignores is left by the linter reading that ignore rather than here.",
    },
    {
      invariantKind: "departure",
      statement: "The linter judges its own config there beside the files the change has.",
    },
    {
      invariantKind: "departure",
      statement: "The linter itself is found under the tree rather than in the mirror.",
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
      statement: "The linter reads each file on its own and follows no import out of that file.",
    },

    {
      invariantKind: "departure",
      statement: "Every finding is answered against the file the finding is in.",
    },
    {
      invariantKind: "departure",
      statement: "A path the linter could not open is no finding in that path.",
    },
    {
      invariantKind: "departure",
      statement: "Every path the linter could not open is answered as one run that fell short.",
    },
    {
      invariantKind: "departure",
      statement: "A run that fell short says so rather than naming a file at fault.",
    },
    {
      invariantKind: "constraint",
      statement: "The tree an audit reads is live, so a path can go while the linter walks it.",
    },
    {
      invariantKind: "departure",
      statement: "A file the change takes away is judged by nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which rules the linter looks for.",
    },
    {
      invariantKind: "absence",
      statement: "The linter's own configuration settles which rules bind.",
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
      statement: "The mirror's root is taken out of every reason reported.",
    },
    {
      invariantKind: "departure",
      statement: "A stylesheet is judged as readily as a body of TypeScript.",
    },
    {
      invariantKind: "absence",
      statement: "Only the files the linter is configured to read are judged.",
    },
  ],
  check: { maxCpuSeconds: 60 },
  audit: { maxCpuSeconds: 180 },
} as const satisfies CodeCheck
