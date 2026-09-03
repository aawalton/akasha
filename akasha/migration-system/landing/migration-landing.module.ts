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
      statement: "A composed body may state `was` as the bytes the program read at that path.",
    },
    {
      invariantKind: "departure",
      statement: "A batch hands every stated `was` to its landing as what must stand unmoved.",
    },
    {
      invariantKind: "departure",
      statement: "A stated `was` no longer matching what stands on disk refuses that batch.",
    },
    {
      invariantKind: "absence",
      statement: "A body stating no `was` is guarded by nothing here at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every batch lands through the landing `migration-checked-landing` chooses for that batch.",
    },
    {
      invariantKind: "departure",
      statement:
        "A batch that only writes over files already standing lands through `landedMechanically`.",
    },
    {
      invariantKind: "departure",
      statement: "`landedMechanically` runs no check and no warrant.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that puts up a page or takes a file away lands through `landedChecked`.",
    },
    {
      invariantKind: "departure",
      statement: "A caller stating its own landing lands every batch through that landing.",
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
      statement: "Three batches refused stop the migration.",
    },
    {
      invariantKind: "departure",
      statement: "The three are counted across the whole migration rather than in a row.",
    },
    {
      invariantKind: "departure",
      statement: "`haltAfter` is that count.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may state another count.",
    },
    {
      invariantKind: "departure",
      statement: "What stopped a migration is answered.",
    },
    {
      invariantKind: "departure",
      statement: "A batch that lands does not clear the count of batches already refused.",
    },
    {
      invariantKind: "departure",
      statement: "A batch refused is said on standard error as that batch is refused.",
    },
    {
      invariantKind: "departure",
      statement: "What a refused batch answered is said under the batch.",
    },
    {
      invariantKind: "departure",
      statement: "A migration that refused a batch closes by saying the migration is partial.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that reads nothing back still learns that a migration was partial.",
    },
    {
      invariantKind: "departure",
      statement: "A migration every batch of which lands says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A caller may hand in `saying` to take the said lines instead.",
    },
    {
      invariantKind: "departure",
      statement:
        "A directory a refused batch left holding nothing is taken away and named among `swept`.",
    },
    {
      invariantKind: "departure",
      statement: "A directory holding a file or a directory is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "The root itself is never taken away.",
    },
    {
      invariantKind: "absence",
      statement: "An empty directory is no record of a folder somebody started.",
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
