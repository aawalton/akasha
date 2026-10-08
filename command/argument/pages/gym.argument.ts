import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const gym = {
  id: "01a11b3b-c97d-73cd-9a90-24380753f950",
  type: "page-type/argument",
  slug: "gym",
  said: "--gym",
  takes: "the gym Alan is at, else the gym today's latest set names, else home",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
