import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const readChapter = {
  id: "01a11e25-bdad-7844-b257-402db5a1fb31",
  type: "page-type/argument",
  slug: "read-chapter",
  said: "--chapter",
  takes: "the read chapter parted into beats, named by its slug",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-10-09T00:52:32.300Z",
  updatedAt: "2026-10-09T00:52:32.300Z",
} as const satisfies Argument
