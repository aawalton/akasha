import type { Module } from "@akasha/code-system/module"

export const migrationLanding = {
  id: "01a0654f-b626-789d-9c0a-6ec24acc1a77",
  pageTypeSlug: "module",
  slug: "migration-landing",
  definition: "the bodies a migration composed, landed in batches that each commit on their own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller states a root and one migration.",
    },
    {
      invariantKind: "departure",
      statement: "A migration states what the migration is called as.",
    },
    {
      invariantKind: "departure",
      statement: "A migration states what the migration is of.",
    },
    {
      invariantKind: "departure",
      statement: "A migration states the bodies the migration composed.",
    },
    {
      invariantKind: "departure",
      statement: "A body is composed by the caller rather than read or adapted here.",
    },
    {
      invariantKind: "departure",
      statement: "A body composed as nothing takes the path of that body away.",
    },
    {
      invariantKind: "departure",
      statement: "Every batch lands through `landedMechanically`.",
    },
    {
      invariantKind: "departure",
      statement: "`landedMechanically` runs no check and no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "A batch is one commit.",
    },
    {
      invariantKind: "departure",
      statement: "A batch holds two hundred files at most.",
    },
    {
      invariantKind: "departure",
      statement: "A batch holds two million bytes at most.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may state another count of files.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may state another weight of bytes.",
    },
    {
      invariantKind: "departure",
      statement: "Bodies stating one `together` land in one batch.",
    },
    {
      invariantKind: "departure",
      statement: "A batch carrying one `together` runs past both caps rather than being split.",
    },
    {
      invariantKind: "departure",
      statement: "The order the caller composed the bodies in is the order the bodies land in.",
    },
    {
      invariantKind: "departure",
      statement: "A batch refused leaves the batches before that batch landed.",
    },
    {
      invariantKind: "departure",
      statement: "Three batches refused in a row stop the migration.",
    },
    {
      invariantKind: "departure",
      statement: "What stopped a migration is answered.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that landed clears the count of batches refused in a row.",
    },
    {
      invariantKind: "departure",
      statement: "One path composed twice is refused before anything lands.",
    },
    {
      invariantKind: "departure",
      statement: "A path written from the root's own top is refused before anything lands.",
    },
    {
      invariantKind: "departure",
      statement: "What each batch was told is answered alongside what landed.",
    },
    {
      invariantKind: "departure",
      statement: "What is on disk is read back rather than taken from the code a landing answered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body the formatter moved as that body landed is answered apart from one unmoved.",
    },
    {
      invariantKind: "departure",
      statement: "The landing a migration goes through may be handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A test hands in a landing that lands nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the old system.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what a page means.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes an old file away.",
    },
    {
      invariantKind: "constraint",
      statement: "Every body goes through the formatter once as that body lands.",
    },
    {
      invariantKind: "constraint",
      statement: "A landing costs one formatter run for each file.",
    },
  ],
} as const satisfies Module
