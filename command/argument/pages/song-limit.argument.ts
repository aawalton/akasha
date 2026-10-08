import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const songLimit = {
  id: "01a09507-7a6a-7519-8c5e-7d83d2277e08",
  type: "page-type/argument",
  slug: "song-limit",
  said: "--limit",
  takes: "how many songs at most are brought in",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T09:51:30.410Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
