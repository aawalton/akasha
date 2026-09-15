import type { Command } from "akasha/command/command.page-type.types.ts"

export const changeShow = {
  id: "01a0814d-f6a9-7747-970b-4b441ff35d5a",
  type: "command",
  slug: "change-show",
  definition: "the command answering the body a path would have once this agent's kept edits land",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No flag other than the help flag is said on the command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The help flag is answered with what a show answers and what a show takes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments a show takes are read from standard input.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call piping nothing in is refused rather than run with no argument.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments are read by the reader `akasha change` reads its arguments with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key `at` names the path shown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is read against the repository root here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path outside the repository is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no path is refused rather than showing every path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body shown is the body the edits kept for this agent would leave.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body shown is the body the next change appended is handed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The body shown is not formatted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The world a change reads is not formatted either.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path no edit kept names is shown as that path is committed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the edits kept would leave nowhere is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The lines of the body shown are numbered as `akasha read` numbers a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body past what one answer holds is refused rather than broken off partway.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bytes one answer has are the bytes `akasha read` holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The body shown is recorded as read against the calling agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The oid recorded is the oid of the committed body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That oid is the oid `akasha read` records.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The oid of the body shown is recorded as the oid carried.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path nothing is committed at is recorded under the oid of the body shown.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here appends an edit.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here lands.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No turn is taken over the file the edits fill.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An agent whose page is nowhere is refused rather than answered with nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fold the edits kept refuse is a fault of the data.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body that would not open is an operational fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A show whose edits kept will not replay is refused by the edit that went stale.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key other than `at` is refused rather than passed over.",
    },
  ],
  name: "show",
  arguments: [],
} as const satisfies Command
