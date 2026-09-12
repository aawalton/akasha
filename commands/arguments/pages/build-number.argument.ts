import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const buildNumber = {
  id: "01a094c8-458c-7c0e-9216-cc6f49cce14d",
  type: "argument",
  slug: "build-number",
  said: "--build-number",
  takes: "the number App Store Connect gave the build",
  value: "whole-number",
  placeholder: "n",
} as const satisfies Argument
