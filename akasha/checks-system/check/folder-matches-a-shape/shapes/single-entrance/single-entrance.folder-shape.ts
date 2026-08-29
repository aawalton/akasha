import type { FolderShape } from "../folder-shape.page-type.ts"

export const singleEntrance = {
  id: "01a04e33-f280-793d-9637-073c66a73034",
  pageTypeSlug: "folder-shape",
  slug: "single-entrance",
  definition: "the shape of a folder reached from outside through one file and no other",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file named `.d.ts` is passed over, because a declaration carries no code of its own to be the door to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder is entered through the files sitting in it, so a file under a subfolder reached from outside is a second door rather than a deeper one.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no code file at all takes this shape rather than failing it.",
    },
    {
      invariantKind: "gap",
      statement:
        "Whether a file is entered is read off what imports it, so this folder's shape turns on what other folders do, and a change touching neither can still change the answer.",
    },
  ],
} as const satisfies FolderShape
