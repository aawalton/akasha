import type { Check } from "../check.page-type.ts"

export const lintClean = {
  id: "01a04eec-d235-7000-9f19-d65076b0c634",
  pageTypeSlug: "check",
  slug: "lint-clean",
  definition: "the check refusing a change the linter finds fault in",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The files a change is judged by are the ones it carries: what lands is read the way the linter reads what already stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Audit is handed every file: the same reading covers one change and the whole tree and neither phase is named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The linter reads a world written out of what the change proposes — never the working tree.",
    },
    {
      invariantKind: "departure",
      statement:
        "The world holds only the files being judged: the linter reads each file on its own and follows no import out of it.",
    },
    {
      invariantKind: "departure",
      statement: "A linter that could not run is a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Every finding is answered — each against the file it stands in.",
    },
    {
      invariantKind: "departure",
      statement: "A file the change takes away is judged by nothing.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here says what the linter looks for. Which rules bind is what the linter is configured by. This carries what it found.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing is fixed. This says what stands and refuses. What to change is left to whoever wrote it.",
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
      invariantKind: "gap",
      statement: "Only TypeScript is judged.",
    },
  ],
} as const satisfies Check
