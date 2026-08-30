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
      invariantKind: "departure",
      statement:
        "A name bound at the top of a file to a literal is judged as a constant, a literal being an object, an array, a string, a number, a regular expression, `true` or `false`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The name passed over is the one the file's stem makes: in a page file that is the page's value, and in a property file the stem carries a dot and makes no identifier.",
    },
    {
      invariantKind: "absence",
      statement:
        "A name bound at the top of a file to a value worked out is not judged. Whether such a value is data or a thing the file acts on does not stand in its syntax.",
    },
    {
      invariantKind: "absence",
      statement:
        "A page file's own value is not judged here. `page-named-as-stated` holds it to the name the slug it states makes.",
    },
    {
      invariantKind: "gap",
      statement: "A name inside a function is judged against `derived-identifier`.",
    },
  ],
} as const satisfies Check
