import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noRefusedSyntax = {
  id: "01a0500d-738b-7831-b8d7-66fe5737a5c8",
  type: "page-type/check-code",
  slug: "no-refused-syntax",
  definition: "the check refusing a source file with a pattern a syntax rule names",
  parts: ["page-type/syntax-rule"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rules are found in the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule the change leaves alone is read from the tree, which holds that same body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What reading the rules from the tree reached is read from the module cache.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every rule is read from the change where the change carries any of what that reached.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rule is read from the tree where the change carries that rule's own code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule the tree no longer holds is judged by the body the change answers for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every rule a run loads is compiled once and held for the rest of that run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's code that does not parse refuses the run.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rule is judged by what a recovering parse made of a body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule whose code the change carries is judged by the body the change carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rule is judged by the body that rule had before the change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule body the change carries is run before anyone has read that body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is parsed the once and handed to every rule left to judge it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule the file's text excuses is left out before the file is parsed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file every mark excuses reaches no parse and no rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark is read off the rule's own code beside the judging.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rules sit together under one check rather than each rule apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file two rules refuse is refused by each rule apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each reason names the rule that gave the reason.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check with no rule at all is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule that throws is not caught here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file whose bytes are not valid UTF-8 refuses the check rather than passing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body the change carries reaches a module that change moves at the path it moves to.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 60 },
} as const satisfies CheckCode
