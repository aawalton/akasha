import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageComputing = {
  id: "01a071a5-d394-7d1d-ac04-9a2bf63eeaa8",
  type: "page-type/module",
  slug: "page-computing",
  definition: "the values a page type's calculations work out over the values a page carries",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation is handed the page being worked out and a reach and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page handed to a calculation has every computed key as a lazy read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is not finite is absent on the page handed to a calculation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is not finite remains in the values a page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation answering a number that is not finite is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A computed key is worked out once over one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key already worked answers the same on every later read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation answering absent puts no key on the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation answering another kind than the property states is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating a kind no calculation answers is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation holding records answers a list with nothing in it but records.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain of reads coming back to where that chain started is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal darkens the key that refused rather than every key the page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A calculation reading a refused calculation is refused too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal a key has names the fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach answers the page one slug names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reach reaching no page answers nothing rather than refusing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a naming reach starts from is the page whose calculation is running.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A source stating no way to answer a naming answers no page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page reached under two names is worked once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shape a calculation is handed is taken from the computed property page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A frame is a page's id and a property's slug together.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file or reaches a store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file a reach names is read by the source, and a source stating no way reads none.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No answer is kept past the working the answer was worked in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the formula language.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A calculation holding a relation answers the address of the page the relation names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation naming a page of a type extending the type reached is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation naming a page of another type, or naming no page, is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property holding a relation and naming no page type to reach is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property naming a page type to reach and holding another kind is refused.",
    },
  ],
} as const satisfies Module
