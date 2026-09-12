import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noRefusedSyntax = {
  id: "01a0500d-738b-7831-b8d7-66fe5737a5c8",
  type: "code-check",
  slug: "no-refused-syntax",
  definition: "the check refusing a source file with a pattern a syntax rule names",
  parts: ["page-type/syntax-rule"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rules are found in the index.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's code is read from the change the check is handed.",
    },
    {
      invariantKind: "absence",
      statement: "No rule's code is read from the working tree while a change is judged.",
    },
    {
      invariantKind: "departure",
      statement: "A rule the tree no longer holds is judged by the body the change answers for.",
    },
    {
      invariantKind: "departure",
      statement: "Every rule a run loads is compiled once and held for the rest of that run.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's code that does not parse refuses the run.",
    },
    {
      invariantKind: "absence",
      statement: "No rule is judged by what a recovering parse made of a body.",
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
      invariantKind: "departure",
      statement: "A rule body the change carries is run before anyone has read that body.",
    },
    {
      invariantKind: "departure",
      statement: "A file is parsed the once and handed to every rule left to judge it.",
    },
    {
      invariantKind: "departure",
      statement: "A rule the file's text excuses is left out before the file is parsed.",
    },
    {
      invariantKind: "departure",
      statement: "A file every mark excuses reaches no parse and no rule.",
    },
    {
      invariantKind: "departure",
      statement: "A mark is read off the rule's own code beside the judging.",
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
    {
      invariantKind: "departure",
      statement:
        "A body the change carries reaches a module that change moves at the path it moves to.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
