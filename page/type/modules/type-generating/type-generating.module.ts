import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeGenerating = {
  id: "01a087a6-ed6a-7836-81f3-764344e58378",
  type: "module",
  slug: "type-generating",
  definition: "the types a page type's generator writes for every page of that page type",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A type file is written by a machine rather than composed by an agent.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every page type stating a type generator is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type stating no type generator has no generator run for it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A generator sits beside its page type as that page type's `type-generator` section.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generator writes for every page of the page type stating that generator.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is among the pages its own generator writes for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generator that is not there is said rather than refusing the landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A generator answering to no `generateTypes` function is said rather than refusing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generator that breaks is said rather than refusing the landing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file already with the body that would be written again is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A body written here is handed to the formatter rather than left for a landing to reformat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file that is not there yet is answered as an addition rather than a replacement.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The types are worked out again only where the change could turn what they hold.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a change could turn is asked of each generator rather than worked out here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types state a generator is read from the index before the change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generator saying nothing about what a change turns is run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generator that could not be loaded is run rather than passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generator saying the change turns nothing writes no type for that change.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type is reached through the shadow of the change being judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A generator runs off the body the change leaves rather than off the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What a change could turn is asked of the generator that change leaves rather than the checkout's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing here refuses a landing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a file.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement:
        "`loadedBy` names a page type, and only one stating a generator is loaded, so nothing declares it.",
    },
  ],
} as const satisfies Module
