import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentLandingAgain = {
  id: "01a0950c-f75d-7a61-8566-0fd55b934e22",
  type: "module",
  slug: "subagent-landing-again",
  definition: "a landing asked for again after a reason that clears while the run waits",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A reason is worth another try only where another try in this same run would meet a different world.",
    },
    {
      invariantKind: "departure",
      statement: "A landing another landing's lock refused is asked for again.",
    },
    {
      invariantKind: "departure",
      statement: "A landing refused for a tree that moved under the landing is asked for again.",
    },
    {
      invariantKind: "departure",
      statement: "The words each of those refusals is known by come from the module wording it.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal naming neither is answered at once.",
    },
    {
      invariantKind: "departure",
      statement: "A landing is asked for five times at most.",
    },
    {
      invariantKind: "departure",
      statement: "An ask is made thirty seconds after the ask that refused.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that ends in an error answers that error as a reason of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A reason made from an error says it was an error rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing whose error names the lock is asked for again as a refusal naming it is.",
    },
    {
      invariantKind: "absence",
      statement: "No error a landing ends in reaches past the ask that asked for that landing.",
    },
    {
      invariantKind: "constraint",
      statement: "A module a run could not find stays unfound for the rest of that run.",
    },
    {
      invariantKind: "departure",
      statement:
        "A landing that could not find a module is answered at once rather than asked for again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes what a landing lands or reads what a landing wrote.",
    },
  ],
} as const satisfies Module
