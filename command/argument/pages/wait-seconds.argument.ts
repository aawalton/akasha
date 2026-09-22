import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const waitSeconds = {
  id: "01a0c96e-b91a-7343-9727-f48217c6ad96",
  type: "page-type/argument",
  slug: "wait-seconds",
  said: "--wait",
  takes: "how many seconds to wait before answering with nothing",
  value: "whole-number",
  placeholder: "seconds",
  default: "900",
} as const satisfies Argument
