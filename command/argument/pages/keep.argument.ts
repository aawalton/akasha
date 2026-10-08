import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const keep = {
  id: "01a094fe-7e7c-7804-aee7-fde3c29293d6",
  type: "page-type/argument",
  slug: "keep",
  said: "--keep",
  takes: "leave the gateway running and say the process id to stop it by",
  value: "none",
  createdAt: "2026-09-12T09:41:41.628Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
