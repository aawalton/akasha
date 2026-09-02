import type { SyntaxRule } from "../syntax-rule.page-type.ts"

export const noSwallowedRead = {
  id: "01a05236-31a6-737d-a92f-92fa9654f06a",
  pageTypeSlug: "syntax-rule",
  slug: "no-swallowed-read",
  definition:
    "the rule refusing a read failure caught and passed over in a file that walks a change",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file importing `Change` walks the paths a change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A file importing `Judging` walks the paths a change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A file importing `Judged` walks the paths a change carries.",
    },
    {
      invariantKind: "departure",
      statement: "That file is where a read that fails costs a path rather than a caller.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read by `readFileSync` and its kin.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read by `Bun.file`.",
    },
    {
      invariantKind: "departure",
      statement: "A body is read by a binding taken from `createRequire`.",
    },
    {
      invariantKind: "departure",
      statement: "A decode is no read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body that will not decode is a fact about that body rather than a failure to reach it.",
    },
    {
      invariantKind: "departure",
      statement: "The read stands in the try itself or through a function beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A catch that throws stands.",
    },
    {
      invariantKind: "departure",
      statement: "A catch that calls `process.exit` stands.",
    },
    {
      invariantKind: "departure",
      statement: "A catch that calls a function typed `never` stands.",
    },
    {
      invariantKind: "departure",
      statement: "The run ends there and no path is counted as judged.",
    },
    {
      invariantKind: "departure",
      statement: "A catch resuming the walk with `continue` or `break` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A catch the failure falls out of is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The line named is the catch's own.",
    },
    {
      invariantKind: "absence",
      statement: "Only the file handed in is read.",
    },
    {
      invariantKind: "gap",
      statement: "A null answered rather than thrown is followed to the caller reading the null.",
    },
    {
      invariantKind: "departure",
      statement: "A catch using what it caught is carrying it rather than dropping it.",
    },
    {
      invariantKind: "departure",
      statement: "A catch that never names what the catch caught has dropped the failure.",
    },
  ],
} as const satisfies SyntaxRule
