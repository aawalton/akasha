import type { NamePlace } from "../name-place.page-type.ts"

export const fileRole = {
  id: "01a04fd0-c6e8-7989-926c-76c5d7b35075",
  pageTypeSlug: "name-place",
  slug: "file-role",
  definition: "the part of a file's name saying what the file is to its page",
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A role is a file property the page's type declares rather than a word chosen at the file.",
    },
    {
      invariantKind: "departure",
      statement: "A page's own file states no role.",
    },
  ],
} as const satisfies NamePlace
