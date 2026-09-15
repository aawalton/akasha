import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const pagePropertyHasItsFile = {
  id: "01a04d86-434f-7119-b8cc-858d63edf631",
  type: "page-type/check-code",
  slug: "page-property-has-its-file",
  definition: "the check refusing a page that states a property held in a file it does not have",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which properties are held in a file is read from the page properties rather than from a list here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Presence is the whole test.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The index files the path a page states whether or not a file stands there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is present when the change answers with a body for its path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is absent when the change answers with nothing.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "The body standing at a path the change does not name is answered by the base commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the declaration claiming that file states uncommitted is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which declaration claims a file is read from the page's own type rather than from the property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page named for a page type the change itself has is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file property the change introduces is asked for its file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page having a changed path is judged even when the change never names that page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page has a changed path is composed out of that path's own name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the change itself writes names pages here as a landed one does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the change takes away is passed over.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
