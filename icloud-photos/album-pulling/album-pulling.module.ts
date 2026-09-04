import type { Module } from "../../code-system/modules/module.page-type.ts"

export const albumPulling = {
  id: "01a06585-5f39-70a6-bafc-9a2c3771bb19",
  pageTypeSlug: "module",
  slug: "album-pulling",
  definition: "the CloudKit calls an iCloud shared album is read by, and where each photo goes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request is built without the request being made.",
    },
    {
      invariantKind: "departure",
      statement: "A page of results is asked for by the rank the last page ended at.",
    },
    {
      invariantKind: "departure",
      statement: "A photo whose name repeats an earlier name is numbered rather than overwritten.",
    },
    {
      invariantKind: "departure",
      statement: "A name that decodes to nothing usable becomes the record name and a heic ending.",
    },
  ],
} as const satisfies Module
