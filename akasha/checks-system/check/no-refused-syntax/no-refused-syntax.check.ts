import type { Check } from "../check.page-type.ts"

export const noRefusedSyntax = {
  id: "01a0500d-738b-7831-b8d7-66fe5737a5c8",
  pageTypeSlug: "check",
  slug: "no-refused-syntax",
  definition: "the check refusing a source file carrying a pattern a syntax rule names",
  partSlugs: ["page-type/syntax-rule"],
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules are found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "A file is parsed the once and handed to every rule.",
    },
    {
      invariantKind: "departure",
      statement: "The rules stand together under one check rather than each apart.",
    },
    {
      invariantKind: "departure",
      statement: "A file two rules refuse is refused twice.",
    },
    {
      invariantKind: "departure",
      statement: "Each reason names the rule that gave it.",
    },
    {
      invariantKind: "departure",
      statement: "No rule standing at all is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that throws is not caught here.",
    },
    {
      invariantKind: "gap",
      statement: "A file whose bytes are not valid UTF-8 is passed over rather than refused.",
    },
  ],
} as const satisfies Check
