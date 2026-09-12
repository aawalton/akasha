import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const macbookFile = {
  id: "01a094e3-2570-7c3a-a100-1fe8d00a2405",
  type: "argument",
  slug: "macbook-file",
  said: "--file-path",
  takes: "the macbook path to an export zip or to an unpacked export.xml",
  value: "text",
  placeholder: "path",
} as const satisfies Argument
