import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const height = {
  id: "01a094d8-daac-7370-b174-0e5cd87649e2",
  type: "page-type/argument",
  slug: "height",
  said: "--height",
  takes: "how tall the image is rendered",
  value: "whole-number",
  placeholder: "n",
  default: "1024",
  createdAt: "2026-09-12T09:00:34.860Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
