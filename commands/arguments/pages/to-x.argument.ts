import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const toX = {
  id: "01a094c5-73ab-7665-a39c-b9a5c09c89c8",
  type: "argument",
  slug: "to-x",
  said: "--to-x",
  takes: "how far across the viewport the finger ends",
  value: "whole-number",
  placeholder: "px",
} as const satisfies Argument
