import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const port = {
  id: "01a094b6-d2b1-7253-87f7-c740f5e38f74",
  type: "argument",
  slug: "port",
  said: "--port",
  takes: "the port to run on, replacing the one the base port and the seq work out",
  value: "whole-number",
  placeholder: "p",
} as const satisfies Argument
