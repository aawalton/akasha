import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const sheetRange = {
  id: "01a13ab3-9ddc-7aca-9c36-784ba3c37ca8",
  type: "page-type/argument",
  slug: "sheet-range",
  said: "--range",
  takes: "the cells, said in A1 notation, with the tab before `!` where the URL names none",
  value: "text",
  placeholder: "a1-range",
  createdAt: "2026-10-14T13:56:52.316Z",
  updatedAt: "2026-10-14T13:56:52.316Z",
} as const satisfies Argument
