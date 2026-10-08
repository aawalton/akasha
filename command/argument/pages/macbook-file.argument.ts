import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const macbookFile = {
  id: "01a094e3-2570-7c3a-a100-1fe8d00a2405",
  type: "page-type/argument",
  slug: "macbook-file",
  said: "--file-path",
  takes: "the macbook path to an export zip or to an unpacked export.xml",
  value: "text",
  placeholder: "path",
  createdAt: "2026-09-12T09:11:49.360Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
