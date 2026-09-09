import type { Module } from "@akasha/code/module"

export const pageComputing = {
  id: "01a071a5-d394-7d1d-ac04-9a2bf63eeaa8",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-computing",
  definition: "the values a page type's calculations work out over the values a page carries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A calculation is handed the page being worked out and a reach and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A page handed to a calculation has every computed key as a lazy read.",
    },
    {
      invariantKind: "departure",
      statement: "A number that is not finite is absent on the page handed to a calculation.",
    },
    {
      invariantKind: "departure",
      statement: "A number that is not finite remains in the values a page has.",
    },
    {
      invariantKind: "departure",
      statement: "A computed key is worked out once over one page.",
    },
    {
      invariantKind: "departure",
      statement: "A key already worked answers the same on every later read.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation answering absent puts no key on the page.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation answering another kind than the property states is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A property stating a kind no calculation answers is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A chain of reads coming back to where that chain started is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal darkens the key that refused rather than every key the page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A calculation reading a refused calculation is refused too.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal a key has names the fault.",
    },
    {
      invariantKind: "departure",
      statement: "A reach answers the page one slug names.",
    },
    {
      invariantKind: "departure",
      statement: "A reach reaching no page answers nothing rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "The page a naming reach starts from is the page whose calculation is running.",
    },
    {
      invariantKind: "departure",
      statement: "A source stating no way to answer a naming answers no page.",
    },
    {
      invariantKind: "departure",
      statement: "A page reached under two names is worked once.",
    },
    {
      invariantKind: "departure",
      statement: "The shape a calculation is handed is taken from the computed property page type.",
    },
    {
      invariantKind: "departure",
      statement: "A frame is a page's id and a property's slug together.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file or reaches a store.",
    },
    {
      invariantKind: "absence",
      statement: "No answer is kept past the working the answer was worked in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the formula language.",
    },
  ],
} as const satisfies Module
