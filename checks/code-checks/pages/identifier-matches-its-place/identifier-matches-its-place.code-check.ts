import type { CodeCheck } from "../../code-check.page-type.ts"

export const identifierMatchesItsPlace = {
  id: "01a0500d-f968-74e7-b9a7-8394faa7a890",
  pageTypeSlug: "code-check",
  slug: "identifier-matches-its-place",
  definition: "the check refusing a declared name not written in the format its place states",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A type and an interface stand in one place.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function is judged whether the function is declared or bound to a name at any depth.",
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
      statement: "A name a declaration file states is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A declaration file names what another language or another writer already named.",
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
      statement: "A type parameter and a property key are each their own place.",
    },
    {
      invariantKind: "absence",
      statement: "Neither place is judged here.",
    },
    {
      invariantKind: "departure",
      statement: "A function is judged a component by what the function answers with.",
    },
    {
      invariantKind: "departure",
      statement: "An element is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "A list of elements is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "An element handed to a call is drawn where the call answers.",
    },
    {
      invariantKind: "departure",
      statement: "A function answering with an object holding elements draws nothing.",
    },
    {
      invariantKind: "constraint",
      statement: "JSX reads a name opening lower as a tag of the browser's own.",
    },
    {
      invariantKind: "departure",
      statement: "A body written with JSX is judged as readily as a body written without.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name a JSX element opens with is judged as a component rather than by where the name is bound.",
    },
    {
      invariantKind: "departure",
      statement: "The element opening with that name is looked for as far as that name reaches.",
    },
    {
      invariantKind: "gap",
      statement: "A component opened as an element only from another file is judged as a function.",
    },
    {
      invariantKind: "departure",
      statement: "A tag opening lower makes no component.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name bound at the top of a file with `const` to a literal is judged as a constant.",
    },
    {
      invariantKind: "absence",
      statement: "A name bound at the top of a file with anything but `const` is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A name the file can bind again holds a thing the file acts on rather than data.",
    },
    {
      invariantKind: "gap",
      statement: "A name bound with `let` at the top of a file sits in a place no page names.",
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
      statement:
        "`page-named-as-stated` holds a page file's own value to the name the slug that value states makes.",
    },
    {
      invariantKind: "departure",
      statement: "A name inside a function is judged against `derived-identifier`.",
    },
    {
      invariantKind: "departure",
      statement: "A parameter of a function carrying a body stands in that place.",
    },
    {
      invariantKind: "departure",
      statement: "A parameter of a function type or a method signature declares nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "Each name a pattern binds is judged and the key it binds from is not.",
    },
    {
      invariantKind: "departure",
      statement: "A catch binding is judged there.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parameter opening with an underscore is passed over where the body does not read the parameter.",
    },
  ],
} as const satisfies CodeCheck
