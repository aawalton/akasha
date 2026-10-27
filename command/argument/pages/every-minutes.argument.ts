import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const everyMinutes = {
  id: "01a17ef5-e637-7c21-ae5f-2349935a8dc6",
  type: "page-type/argument",
  slug: "every-minutes",
  said: "--every",
  takes: "the minutes one session of a montage passes",
  value: "whole-number",
  placeholder: "minutes",
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Argument
