import type { CodeCheck } from "../../code-check.page-type.ts"

export const noRefusedSyntax = {
  id: "01a0500d-738b-7831-b8d7-66fe5737a5c8",
  pageTypeSlug: "code-check",
  slug: "no-refused-syntax",
  definition: "the check refusing a source file carrying a pattern a syntax rule names",
  partSlugs: ["page-type/syntax-rule"],
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules are found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that already landed has its code loaded from where its body sits on disk.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change rewriting a rule's code is refused rather than judged by the body before the change.",
    },
    {
      invariantKind: "departure",
      statement: "A rule this change introduces is judged by the body the change carries.",
    },
    {
      invariantKind: "departure",
      statement: "A file is parsed the once and handed to every rule.",
    },
    {
      invariantKind: "departure",
      statement: "The rules stand together under one check rather than each rule apart.",
    },
    {
      invariantKind: "departure",
      statement: "A file two rules refuse is refused by each rule apart.",
    },
    {
      invariantKind: "departure",
      statement: "Each reason names the rule that gave the reason.",
    },
    {
      invariantKind: "departure",
      statement: "No rule standing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A rule that throws is not caught here.",
    },
    {
      invariantKind: "departure",
      statement: "A file whose bytes are not valid UTF-8 refuses the check rather than passing.",
    },
  ],
} as const satisfies CodeCheck
