import type { Module } from "@akasha/code-system/module"

export const migrationReach = {
  id: "01a0654f-b626-73bf-8f5f-baa761fc112c",
  pageTypeSlug: "module",
  slug: "migration-reach",
  definition: "whether one file outside akasha is content that is inside akasha as well",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file is judged at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A folder having been migrated is no answer about any file in that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A file is reached only where something under akasha is found for that file.",
    },
    {
      invariantKind: "departure",
      statement: "A page under akasha stating the file's own id reaches that file.",
    },
    {
      invariantKind: "departure",
      statement: "A page under akasha carrying the file's page type and slug reaches that file.",
    },
    {
      invariantKind: "departure",
      statement: "A file under akasha holding the very same bytes reaches the file judged.",
    },
    {
      invariantKind: "departure",
      statement: "A migration may name the akasha path composed from a file.",
    },
    {
      invariantKind: "departure",
      statement: "A named path that is under akasha reaches the file the path was named for.",
    },
    {
      invariantKind: "departure",
      statement: "A named path that is nowhere under akasha reaches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An id ending in the eight hex a replaced id keeps is carried as weak.",
    },
    {
      invariantKind: "departure",
      statement: "A weak reason reaches nothing alone.",
    },
    {
      invariantKind: "departure",
      statement: "Every reason a file was reached is answered rather than the first reason found.",
    },
    {
      invariantKind: "departure",
      statement: "A file reached names the akasha path each reason was found at.",
    },
    {
      invariantKind: "departure",
      statement: "A file not reached is answered with why.",
    },
    {
      invariantKind: "departure",
      statement: "A file not reached is answered with whatever weak reason was found.",
    },
    {
      invariantKind: "departure",
      statement: "What is inside akasha is read once into a reading.",
    },
    {
      invariantKind: "departure",
      statement: "One reading answers a whole sweep.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is taken through git rather than by walking the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A reading names the commit the reading was taken at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading taken before a migration landed cannot reach what that migration wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep is run after the landing rather than before the landing.",
    },
    {
      invariantKind: "departure",
      statement: "What a file says of itself is read from the file's own front matter.",
    },
    {
      invariantKind: "departure",
      statement: "A file with no front matter is read for the values the body declares.",
    },
    {
      invariantKind: "departure",
      statement: "A file saying nothing of itself is reached only by bytes or by a named path.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a file away.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here judges whether what is inside akasha is any good.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A page type and slug may name an old page and a new page that are not the same page.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A reason found says something of the content rather than proving the content whole.",
    },
  ],
} as const satisfies Module
