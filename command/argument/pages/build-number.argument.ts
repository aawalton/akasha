import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const buildNumber = {
  id: "01a094c8-458c-7c0e-9216-cc6f49cce14d",
  type: "page-type/argument",
  slug: "build-number",
  said: "--build-number",
  takes: "the number App Store Connect gave the build",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T08:42:28.108Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
