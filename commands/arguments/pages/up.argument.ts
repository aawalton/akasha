import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const up = {
  id: "01a094f7-6a09-7a03-9661-2eb69c53f9e6",
  type: "argument",
  slug: "up",
  said: "--up",
  takes: "the domain to draw ABOVE instead of below, up to the roots, said once per domain",
  value: "text",
  placeholder: "slug",
  repeats: true,
} as const satisfies Argument
