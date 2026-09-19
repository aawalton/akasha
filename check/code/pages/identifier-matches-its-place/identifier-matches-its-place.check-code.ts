import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const identifierMatchesItsPlace = {
  id: "01a0500d-f968-74e7-b9a7-8394faa7a890",
  type: "page-type/check-code",
  slug: "identifier-matches-its-place",
  definition: "the check refusing a declared name not written in the format its place states",
  parts: ["module/place-reading"],
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A type and an interface stand in one place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function is judged whether the function is declared or bound to a name at any depth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a declaration is judged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name a declaration states is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A declaration names a thing another language or another writer already named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every name a declaration file states is a declaration.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "This judges where the repo has arrived.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A type parameter and a property key are each their own place.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Neither place is judged here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function opening upper is judged a component by the value the function answers with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A list of elements is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An element handed to a call is drawn where the call answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function answering with an object holding elements draws nothing.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "JSX reads a name opening lower as a tag of the browser's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body written with JSX is judged as readily as a body written without.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a JSX element opens with is judged as a component rather than by where the name is bound.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The element opening with that name is looked for as far as that name reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function a drawn file exports with a name opening upper and answering with null is a component.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A return inside a function nested in the body is no answer of the outer one.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A component in a file not named `.tsx` is judged as a function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag opening lower makes no component.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function opening lower is judged a function however that function draws.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A component opened as a tag only under the name another file imports it as is judged a function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name bound at the top of a file with `const` to a literal is judged as a constant.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name bound at the top of a file with anything but `const` is not judged.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A name the file can bind again has a thing the file acts on rather than data.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A name bound with `let` at the top of a file sits in a place no page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name passed over is the name the file's stem makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stem carrying a section makes a name from the stem's parts joined by `-`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A name bound at the top of a file to a value worked out is not judged.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page file's own value is not judged here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A page file's own value is passed over whether or not the file's name carries a section.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "`page-named-as-stated` holds a page file's own value to the name the slug that value states makes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name inside a function is judged against `derived-identifier`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parameter of a function with a body stands in that place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parameter of a function type or a method signature declares nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each name a pattern binds is judged and the key that pattern binds from is not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catch binding is judged there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A parameter opening with an underscore is passed over where the body does not read the parameter.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A name another writer fixed outside akasha is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name spelled as the `luaExport` its page states is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a page type states as a `loadedExport` is passed over in the code beside a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name declared both as a type and as a value in the same file stands in the type's place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name a file property states as a `fixedExport` is passed over in the file that property names.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 120 },
} as const satisfies CheckCode
