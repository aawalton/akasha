import type { Check } from "../check.page-type.ts"

export const noRefusedSyntax = {
  id: "01a0500d-738b-7831-b8d7-66fe5737a5c8",
  pageTypeSlug: "check",
  slug: "no-refused-syntax",
  definition: "the check refusing a source file carrying a pattern a syntax rule names",
  partSlugs: ["page-type/syntax-rule"],
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The rules are found in the index, so a rule is added by adding a folder and nothing here changes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file is parsed the once and handed to every rule, which is why the rules stand together under one check rather than each apart.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file two rules refuse is refused twice, each reason naming the rule that gave it, so fixing one does not hide the other.",
    },
    {
      invariantKind: "departure",
      statement:
        "No rule standing at all is refused, because a clean answer from nothing judged would mean nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rule that throws is not caught here, so a rule that could not judge refuses the whole check rather than passing quietly.",
    },
    {
      invariantKind: "gap",
      statement:
        "A file whose bytes are not valid UTF-8 is passed over rather than refused, so it answers clean without ever being read.",
    },
  ],
} as const satisfies Check
