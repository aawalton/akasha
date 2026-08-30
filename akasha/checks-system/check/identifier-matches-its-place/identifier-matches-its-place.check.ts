import type { Check } from "../check.page-type.ts"

export const identifierMatchesItsPlace = {
  id: "01a0500d-f968-74e7-b9a7-8394faa7a890",
  pageTypeSlug: "check",
  slug: "identifier-matches-its-place",
  definition: "the check refusing a declared name not written in the format its place states",
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
        "The format is read from the place page, so this check names where a name stands and never says how it is written.",
    },
    {
      invariantKind: "departure",
      statement: "A type and an interface stand in one place, because each gives a name to a type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function is judged whether it is declared or bound to a name, at any depth, because each puts a function behind an identifier.",
    },
    {
      invariantKind: "departure",
      statement:
        "Only a declaration is judged, so a name this file merely reads is left to the file declaring it.",
    },
    {
      invariantKind: "absence",
      statement:
        "A name outside akasha is passed over. The places hold for the whole repo, and this judges where the repo has arrived.",
    },
    {
      invariantKind: "absence",
      statement:
        "A type parameter, a property key, a parameter and a component are each their own place, and none is judged here.",
    },
    {
      invariantKind: "gap",
      statement:
        "A constant is judged as well, once `constant-identifier` and `derived-identifier` tell apart what the tree holds rather than what it was hoped to hold.",
    },
  ],
} as const satisfies Check
