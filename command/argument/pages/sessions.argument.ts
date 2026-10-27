import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const sessions = {
  id: "01a17ef5-e637-7c13-96a3-cf07d1669b8f",
  type: "page-type/argument",
  slug: "sessions",
  said: "--sessions",
  takes: "the most sessions a montage runs",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Argument
