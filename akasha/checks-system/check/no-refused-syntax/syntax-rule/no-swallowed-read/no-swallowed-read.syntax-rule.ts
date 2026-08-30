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
        "A file importing `Change`, `Judging` or `Judged` is walking the paths a change carries, and that is where a read that fails costs a path rather than a caller.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body is read by `readFileSync` and its kin, by `Bun.file`, by a decoder, or by a binding taken from `createRequire`, in the try itself or through a function beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A catch that throws, calls `process.exit`, or calls a function typed `never` stands, the run ending there and no path being counted as judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "A catch resuming the walk with `continue` or `break` is refused, and so is one the failure falls out of.",
    },
    {
      invariantKind: "departure",
      statement: "The line named is the catch's own, that being the word to change.",
    },
    {
      invariantKind: "absence",
      statement:
        "Only the file handed in is read. A helper in another file that swallows on this one's behalf is not seen from here.",
    },
    {
      invariantKind: "gap",
      statement:
        "A null answered rather than thrown is followed to the caller reading it, so a failure carried out to a refusal is told apart from one dropped.",
    },
  ],
} as const satisfies SyntaxRule
