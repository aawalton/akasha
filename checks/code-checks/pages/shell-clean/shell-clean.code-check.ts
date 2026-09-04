import type { CodeCheck } from "../../code-check.page-type.ts"

export const shellClean = {
  id: "01a05991-d997-76f5-a619-6ddb7444c34f",
  pageTypeSlug: "code-check",
  slug: "shell-clean",
  definition: "the check refusing a change shellcheck finds fault in",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The shell scripts a change is judged by are the ones the change carries.",
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
        "The linter reads a world written out of what the change proposes rather than the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "The world holds every shell script the tree holds.",
    },
    {
      invariantKind: "departure",
      statement: "The world carries no index.",
    },
    {
      invariantKind: "absence",
      statement: "The linter reads no index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A script standing outside the world is a script the linter cannot follow a source into.",
    },
    {
      invariantKind: "departure",
      statement: "A linter that could not run is a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Every finding is answered against the file the finding stands in.",
    },
    {
      invariantKind: "departure",
      statement: "The findings are answered in the order the findings stand in the files.",
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
      statement: "Nothing here says what the linter looks for.",
    },
    {
      invariantKind: "absence",
      statement: "Which findings bind is what the linter itself judges.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is fixed.",
    },
    {
      invariantKind: "constraint",
      statement: "The world is swept whatever the linter said.",
    },
    {
      invariantKind: "constraint",
      statement: "The world's root is taken out of what is reported.",
    },
    {
      invariantKind: "constraint",
      statement: "The linter stands on the host rather than among the declared dependencies.",
    },
    {
      invariantKind: "gap",
      statement: "Only shell scripts are judged.",
    },
  ],
} as const satisfies CodeCheck
