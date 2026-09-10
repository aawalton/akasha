import type { ChangeGuard } from "../../change-guard.page-type.types.ts"

export const importNotLeftHanging = {
  id: "01a07750-f2bd-7d2d-8ad4-0ebf57b8dd1f",
  pageTypeSlug: "change-guard",
  type: "change-guard",
  slug: "import-not-left-hanging",
  changeTargetType: "change-target-type/file-content",
  definition: "the guard refusing an answer that takes a file away another file still imports",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The files importing the path judged are read from the index the answer leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A file importing the file taken away after the change has a hanging import.",
    },
    {
      invariantKind: "departure",
      statement: "A hanging import refuses the answer.",
    },
    {
      invariantKind: "departure",
      statement: "An importer the answer repoints imports the file taken away no longer.",
    },
    {
      invariantKind: "departure",
      statement: "An importer the answer takes away too leaves no import hanging.",
    },
    {
      invariantKind: "departure",
      statement: "Every file taken away is judged rather than the pages alone.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching no file breaks the build whatever page has that import.",
    },
    {
      invariantKind: "absence",
      statement: "Mortality exempts no import here.",
    },
    {
      invariantKind: "departure",
      statement: "An index a guard cannot read refuses the answer.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the working tree.",
    },
    {
      invariantKind: "departure",
      statement: "A path a move carried the body off is judged as a path taken away.",
    },
  ],
} as const satisfies ChangeGuard
