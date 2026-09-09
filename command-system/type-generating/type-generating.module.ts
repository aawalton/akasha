import type { Module } from "@akasha/code/module"

export const typeGenerating = {
  id: "01a087a6-ed6a-7836-81f3-764344e58378",
  pageTypeSlug: "module",
  slug: "type-generating",
  definition: "the types a page type's generator writes for every page of that page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A type file is written by a machine rather than composed by an agent.",
    },
    {
      invariantKind: "departure",
      statement: "Every page type stating a type generator is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating no type generator has no generator run for it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generator sits beside its page type as that page type's `type-generator` section.",
    },
    {
      invariantKind: "departure",
      statement: "A generator writes for every page of the page type stating that generator.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is among the pages its own generator writes for.",
    },
    {
      invariantKind: "departure",
      statement: "A generator that is not there is said rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A generator answering to no `generateTypes` function is said rather than refusing.",
    },
    {
      invariantKind: "departure",
      statement: "A generator that breaks is said rather than refusing the landing.",
    },
    {
      invariantKind: "departure",
      statement: "A file already with the body that would be written again is left out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body written here is handed to the formatter rather than left for a landing to reformat.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that is not there yet is answered as an addition rather than a replacement.",
    },
    {
      invariantKind: "departure",
      statement: "The types are worked out again only where the change could turn what they hold.",
    },
    {
      invariantKind: "departure",
      statement: "What a change could turn is read from the names of the paths that change has.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is reached through the shadow of the change being judged.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
