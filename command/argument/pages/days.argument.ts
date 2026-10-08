import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const days = {
  id: "01a094e3-1172-7dac-a5ef-b325118393aa",
  type: "page-type/argument",
  slug: "days",
  said: "--days",
  takes: "how many days back the trailing window reaches",
  value: "whole-number",
  placeholder: "n",
  createdAt: "2026-09-12T09:11:44.242Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
