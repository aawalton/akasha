import type { Module } from "@akasha/code/module"

export const pathMoving = {
  id: "01a0818f-6163-7ff5-b0d8-a3212cb3ace0",
  pageTypeSlug: "module",
  slug: "path-moving",
  definition:
    "a body a landing moves from one path to another rather than writing it and taking the old away",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change may name paths moved on disk rather than written from a body.",
    },
    {
      invariantKind: "departure",
      statement: "A change naming a move and no body is a change rather than nothing asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A path moved goes by one rename rather than by a write and a taking away.",
    },
    {
      invariantKind: "departure",
      statement: "A path moved that the base commit has is committed as the rename that path made.",
    },
    {
      invariantKind: "departure",
      statement: "A path moved that no commit has moves on disk and is committed nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A path moved is filed in the index as taken away where that move started.",
    },
    {
      invariantKind: "departure",
      statement: "A path moved is filed in the index as written where that move lands.",
    },
    {
      invariantKind: "departure",
      statement: "A body judged where a move lands is the body that move started from.",
    },
    {
      invariantKind: "departure",
      statement: "A body written at the path a move lands at is written after that move.",
    },
    {
      invariantKind: "departure",
      statement: "A landing moving a path from another path works the change out itself.",
    },
    {
      invariantKind: "departure",
      statement: "Those paths move after the index is settled and before the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A move that throws puts back in reverse the moves made before that move.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that throws puts back every move made for that commit.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws has moved nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left with nothing by a path moved away is cleared off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A path moved away that something still imports refuses the change unwritten.",
    },
  ],
} as const satisfies Module
