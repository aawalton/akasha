import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const height = {
  id: "01a094d8-daac-7370-b174-0e5cd87649e2",
  type: "argument",
  slug: "height",
  said: "--height",
  takes: "how tall the image is rendered",
  value: "whole-number",
  placeholder: "n",
  default: "1024",
} as const satisfies Argument
