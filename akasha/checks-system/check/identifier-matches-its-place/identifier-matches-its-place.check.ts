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
      statement: "The format is read from the place page.",
    },
    {
      invariantKind: "departure",
      statement: "A type and an interface stand in one place.",
    },
    {
      invariantKind: "departure",
      statement: "A function is judged whether it is declared or bound to a name at any depth.",
    },
    {
      invariantKind: "departure",
      statement: "Only a declaration is judged.",
    },
    {
      invariantKind: "absence",
      statement: "A name outside akasha is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "The places hold for the whole repo.",
    },
    {
      invariantKind: "absence",
      statement: "This judges where the repo has arrived.",
    },
    {
      invariantKind: "absence",
      statement:
        "A type parameter and a property key and a parameter and a component are each their own place.",
    },
    {
      invariantKind: "absence",
      statement: "None is judged here.",
    },
    {
      invariantKind: "departure",
      statement: "A name bound at the top of a file to a literal is judged as a constant.",
    },
    {
      invariantKind: "departure",
      statement:
        "A literal is an object or an array or a string or a number or a regular expression or `true` or `false`.",
    },
    {
      invariantKind: "departure",
      statement: "The name passed over is the one the file's stem makes.",
    },
    {
      invariantKind: "departure",
      statement: "In a property file the stem carries a dot and makes no identifier.",
    },
    {
      invariantKind: "absence",
      statement: "A name bound at the top of a file to a value worked out is not judged.",
    },
    {
      invariantKind: "absence",
      statement: "A page file's own value is not judged here.",
    },
    {
      invariantKind: "absence",
      statement: "`page-named-as-stated` holds it to the name the slug it states makes.",
    },
    {
      invariantKind: "gap",
      statement: "A name inside a function is judged against `derived-identifier`.",
    },
  ],
} as const satisfies Check
