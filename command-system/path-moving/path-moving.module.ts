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
      statement: "A change may name paths carried on disk rather than written from a body.",
    },
    {
      invariantKind: "departure",
      statement: "A change naming a carry and no body is a change rather than nothing asked for.",
    },
    {
      invariantKind: "departure",
      statement: "A path carried is moved by one rename rather than written and taken away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path carried that the base commit has is committed as the rename that path made.",
    },
    {
      invariantKind: "departure",
      statement: "A path carried that no commit holds is carried on disk and committed nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A path carried is filed in the index as taken away where that carry started.",
    },
    {
      invariantKind: "departure",
      statement: "A path carried is filed in the index as written where that carry lands.",
    },
    {
      invariantKind: "departure",
      statement: "A body judged where a carry lands is the body that carry started from.",
    },
    {
      invariantKind: "departure",
      statement: "A body written at the path a carry lands at is written after that carry.",
    },
    {
      invariantKind: "departure",
      statement: "A landing carrying a path from another path works the change out itself.",
    },
    {
      invariantKind: "departure",
      statement: "Those paths are carried after the index is settled and before the commit.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that throws puts back in reverse the carries made before that carry.",
    },
    {
      invariantKind: "departure",
      statement: "A commit that throws puts back every carry made for that commit.",
    },
    {
      invariantKind: "departure",
      statement: "A landing that throws has carried nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A folder left with nothing by a path carried away is cleared off the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A path carried away that something still imports refuses the change unwritten.",
    },
  ],
} as const satisfies Module
