import type { FolderShape } from "../folder-shape.page-type.ts"

export const singleEntrance = {
  id: "01a06860-a0ef-779c-a72e-83beaacb23f1",
  pageTypeSlug: "folder-shape",
  slug: "single-entrance",
  definition: "the shape of a folder reached at one file rather than at several",
  code: "ts",
  test: "ts",
  enabled: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file reached from outside the folder is an entrance to the folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with one entrance takes this shape.",
    },
    {
      invariantKind: "departure",
      statement: "A folder no import reaches takes this shape too.",
    },
    {
      invariantKind: "departure",
      statement: "A folder with more than one entrance fails this shape.",
    },
    {
      invariantKind: "departure",
      statement: "A type declaration file is no entrance, whatever reaches it.",
    },
    {
      invariantKind: "gap",
      statement:
        "The shape judges no folder until Alan says which folders are held to one entrance.",
    },
  ],
} as const satisfies FolderShape
