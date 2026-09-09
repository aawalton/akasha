import type { Module } from "@akasha/code/module"

export const proseReach = {
  id: "01a0823b-40b3-774c-873f-e2fb70d34da0",
  pageTypeSlug: "module",
  type: "module",
  slug: "prose-reach",
  definition: "the keys a page type states prose under, read off the properties it declares",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property is prose by its page type rather than by the key it is stated under.",
    },
    {
      invariantKind: "departure",
      statement: "A property whose page type extends the prose page type is prose too.",
    },
    {
      invariantKind: "departure",
      statement: "A prose field of a record is reached under the key that record is stated under.",
    },
    {
      invariantKind: "departure",
      statement: "A record inside a record is walked, and a record naming itself is walked once.",
    },
    {
      invariantKind: "departure",
      statement: "A page type reaches every prose the types above it state.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page, so nothing here says which page states prose.",
    },
  ],
} as const satisfies Module
