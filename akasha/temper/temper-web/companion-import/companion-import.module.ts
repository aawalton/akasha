import type { Module } from "@akasha/code-system/module"

export const companionImport = {
  id: "01a0640f-8510-72bd-a455-0d889d0077fd",
  pageTypeSlug: "module",
  slug: "companion-import",
  definition: "a companion build decoded from a hash and filed against the reader's account",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reader who is not signed in imports nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A hash the codec will not decode is refused rather than part-imported.",
    },
    {
      invariantKind: "departure",
      statement: "A hash the reader already holds gives back the build already filed.",
    },
    {
      invariantKind: "departure",
      statement: "A companion build is always live.",
    },
    {
      invariantKind: "departure",
      statement: "The build name is the companion and the main-hand weapon.",
    },
    {
      invariantKind: "departure",
      statement: "A companion carrying no readable main-hand weapon is named by the companion.",
    },
  ],
} as const satisfies Module
