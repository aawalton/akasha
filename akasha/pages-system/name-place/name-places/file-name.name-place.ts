import type { NamePlace } from "../name-place.page-type.ts"

export const fileName = {
  id: "01a04fd0-c6e7-7e50-89dc-16bd43ca72b7",
  pageTypeSlug: "name-place",
  slug: "file-name",
  definition: "the name a file carries",
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A file's name is built of parts parted by dots, each part a name stated elsewhere.",
    },
    {
      invariantKind: "departure",
      statement: "The first part is the slug of the page the file holds or stands beside.",
    },
    {
      invariantKind: "departure",
      statement: "The part after it is the slug of that page's page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A part standing after those two is the file's role, and a file naming no role is the page itself.",
    },
  ],
} as const satisfies NamePlace
