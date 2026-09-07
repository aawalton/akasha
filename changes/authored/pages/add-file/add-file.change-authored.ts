import type { ChangeAuthored } from "../../change-authored.page-type.ts"

export const addFile = {
  id: "01a07813-6e3b-77c3-9c1e-b0c5778fd31b",
  pageTypeSlug: "change-authored",
  slug: "add-file",
  definition: "one body written at one path, judged by the checks a landing runs",
  code: "ts",
  test: "ts",
  runsChecks: true,
  readersOweReading: true,
  writerOwesReading: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The body is handed in whole rather than as a passage.",
    },
    {
      invariantKind: "departure",
      statement: "Writing the body is left to the partial this change runs.",
    },
    {
      invariantKind: "departure",
      statement: "A path under a page name is written by the change judging the pages named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other TypeScript path is written by the change judging the imports named.",
    },
    {
      invariantKind: "departure",
      statement: "Every other path is written by the change judging the file alone.",
    },
    {
      invariantKind: "departure",
      statement: "The checks judge the tree the edits leave.",
    },
    {
      invariantKind: "departure",
      statement: "A page arrives with its `id` worked out here rather than at the landing.",
    },
    {
      invariantKind: "departure",
      statement: "The index files a page this change writes.",
    },
    {
      invariantKind: "departure",
      statement: "A later act in the same change names a page this change wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A caller saying no `id` is taken to have said `auto`.",
    },
    {
      invariantKind: "departure",
      statement: "An `id` a caller states goes in rather than an `id` worked out here.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating an `id` keeps that `id` under `auto`.",
    },
    {
      invariantKind: "departure",
      statement: "A body already stating an `id` refuses an `id` handed in beside that body.",
    },
    {
      invariantKind: "absence",
      statement: "A path naming no page takes no `id`.",
    },
  ],
} as const satisfies ChangeAuthored
