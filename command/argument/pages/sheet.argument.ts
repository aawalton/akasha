import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const sheet = {
  id: "01a13ab3-9ddc-777e-b0c3-e6b68e878e91",
  type: "page-type/argument",
  slug: "sheet",
  said: "--sheet",
  takes: "the sheet, said as its URL or as its id",
  value: "text",
  placeholder: "url-or-id",
  createdAt: "2026-10-14T13:56:52.316Z",
  updatedAt: "2026-10-14T13:56:52.316Z",
} as const satisfies Argument
