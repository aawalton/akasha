import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const indexIsLevelWithThePages = {
  id: "01a091e9-689c-7003-b37b-c2bee87ff75b",
  type: "code-check",
  slug: "index-is-level-with-the-pages",
  definition: "the check refusing an index entry that differs from what the pages say",
  runsOnChange: false,
  runsOnDeploy: false,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The whole reconcile is run and what that reconcile would write is read.",
    },
    {
      invariantKind: "departure",
      statement: "The reconcile writes nothing, so a run of this leaves the index as it is.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the file the entry is for rather than the entry.",
    },
    {
      invariantKind: "departure",
      statement: "An entry the reconcile would add is a file the index never filed.",
    },
    {
      invariantKind: "departure",
      statement: "An entry the reconcile would take away is a file no page names any more.",
    },
    {
      invariantKind: "departure",
      statement: "An entry naming a file no commit carries is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "Such a file arrives and goes while the reconcile runs, so its drift is no skew.",
    },
    {
      invariantKind: "departure",
      statement: "The commit is read before the reconcile runs and again after it.",
    },
    {
      invariantKind: "departure",
      statement: "A file git says moved across that span is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "Such a file landed while the reconcile ran, so its drift is no skew either.",
    },
    {
      invariantKind: "departure",
      statement: "A repository that never moved across that span is asked for no span.",
    },
    {
      invariantKind: "departure",
      statement: "The working tree is read before the reconcile runs and again after it.",
    },
    {
      invariantKind: "departure",
      statement: "A file written there and not yet committed is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "Such a file is mid-landing rather than drifted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file whose own name says a page type stating it is mortal is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "A mortal page is written and taken away as the agents run rather than drifted.",
    },
    {
      invariantKind: "departure",
      statement: "A drift outside that span refuses though the repository moved.",
    },
    {
      invariantKind: "departure",
      statement: "A missing page shows as an entry of its own as well as in what gathers many.",
    },
    {
      invariantKind: "absence",
      statement: "An entry gathering many files is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "An entry the reconcile could not file is judged by nothing here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says why an entry drifted.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing runs at change, because one file says nothing about the whole index.",
    },
  ],
  audit: { maxCpuSeconds: 120 },
} as const satisfies CodeCheck
