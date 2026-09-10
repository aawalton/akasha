import type { CodeCheck } from "../../code-check.page-type.ts"

export const noRefusedSyntax = {
  id: "01a0500d-738b-7831-b8d7-66fe5737a5c8",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-refused-syntax",
  definition: "the check refusing a source file with a pattern a syntax rule names",
  parts: ["page-type/syntax-rule"],
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
      statement: "A rule that already landed has its code loaded from where its body sits on disk.",
    },
    {
      invariantKind: "departure",
      statement: "A rule whose code the change carries is judged by the body the change carries.",
    },
    {
      invariantKind: "absence",
      statement: "No rule is judged by the body that rule had before the change.",
    },
    {
      invariantKind: "gap",
      statement: "A rule body the change carries is run before anyone has read that body.",
    },
    {
      invariantKind: "departure",
      statement: "A file is parsed the once and handed to every rule.",
    },
    {
      invariantKind: "departure",
      statement: "The rules sit together under one check rather than each rule apart.",
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
      statement: "A check with no rule at all is refused.",
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
  check: { maxCpuSeconds: 10 },
} as const satisfies CodeCheck
