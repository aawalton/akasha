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
        "The files a change is judged by are the ones it carries, so what lands is read the way the linter reads what already stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Audit is handed every file, so the same reading covers one change and the whole tree, and neither phase is named here.",
    },
    {
      invariantKind: "departure",
      statement:
        "The linter reads a world written out of what the change proposes, never the working tree, so what is judged is this change and not whatever else stands on disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "The world holds only the files being judged, because the linter reads each file on its own and follows no import out of it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A linter that could not run is a refusal, because a look that did not happen verified nothing and would let a change land unjudged.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every finding is answered, each against the file it stands in, so one run names them all rather than the first one it reached.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file the change takes away is judged by nothing, because no body stands for the linter to read.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here says what the linter looks for. Which rules bind is what the linter is configured by, and this carries what it found.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing is fixed. This says what stands and refuses, and what to change is left to whoever wrote it.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The world is swept whatever the linter said, so no tree is left behind by a refusal.",
    },
    {
      invariantKind: "constraint",
      statement:
        "The world's root is taken out of what is reported, so a reader is never pointed at a tree that has been swept.",
    },
    {
      invariantKind: "gap",
      statement:
        "Only TypeScript is judged, so a file of another kind the linter would read is passed over.",
    },
  ],
} as const satisfies Check
