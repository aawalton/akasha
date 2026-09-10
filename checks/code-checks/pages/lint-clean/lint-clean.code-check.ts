import type { CodeCheck } from "../../code-check.page-type.ts"

export const lintClean = {
  id: "01a04eec-d235-7000-9f19-d65076b0c634",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "lint-clean",
  definition: "the check refusing a change the linter finds fault in",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
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
      invariantKind: "gap",
      statement: "Only the files the linter is configured to read are judged.",
    },
  ],
} as const satisfies CodeCheck
