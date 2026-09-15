import type { SyntaxRule } from "akasha/check/code/pages/no-refused-syntax/syntax-rule/syntax-rule.page-type.types.ts"

export const noSwallowedRead = {
  id: "01a05236-31a6-737d-a92f-92fa9654f06a",
  type: "syntax-rule",
  slug: "no-swallowed-read",
  definition:
    "the rule refusing a read failure caught and passed over in a file that walks a change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file importing `Change` walks the paths a change has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file importing `Judging` walks the paths a change carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file importing `Judged` walks the paths a change has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That file is where a read that fails costs a path rather than a caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is read by `readFileSync` and its kin.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is read by `Bun.file`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is read by a binding taken from `createRequire`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A decode is no read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body that will not decode is a fact about that body rather than a failure to reach that body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The read sits in the try itself or through a function beside that try.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catch that throws is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catch that calls `process.exit` is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catch that calls a function typed `never` is left.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The run ends there and no path is counted as judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catch resuming the walk with `continue` or `break` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catch the failure falls out of is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The line named is the catch's own.",
    },

    {
      invariantKind: "invariant-kind/absence",
      statement: "A null answered rather than thrown is followed to the caller reading the null.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A catch using the caught failure is carrying that failure rather than dropping that failure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catch that never names the caught failure has dropped the failure.",
    },
  ],
} as const satisfies SyntaxRule
