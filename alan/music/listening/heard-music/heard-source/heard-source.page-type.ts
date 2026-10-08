import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const heardSource = {
  id: "01a0caa0-b6c1-7234-996f-f008199be104",
  type: "page-type/page-type",
  slug: "heard-source",
  definition: "where a track came to be counted as heard",
  parts: [
    "heard-source/observed",
    "heard-source/seed-prior-window",
    "heard-source/seed-top-tracks",
  ],
  extends: ["page-type/domain"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T19:38:45.313Z",
  updatedAt: "2026-09-22T19:39:04.000Z",
} as const satisfies PageType
