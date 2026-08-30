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
      statement:
        "A file importing `Change` or `Judging` or `Judged` is walking the paths a change carries.",
    },
    {
      invariantKind: "departure",
      statement: "That is where a read that fails costs a path rather than a caller.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is read by `readFileSync` and its kin or by `Bun.file` or by a decoder or by a binding taken from `createRequire`.",
    },
    {
      invariantKind: "departure",
      statement: "The read stands in the try itself or through a function beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A catch that throws or calls `process.exit` or calls a function typed `never` stands.",
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
      statement: "A null answered rather than thrown is followed to the caller reading it.",
    },
    {
      invariantKind: "gap",
      statement: "A failure carried out to a refusal is told apart from one dropped.",
    },
  ],
} as const satisfies SyntaxRule
