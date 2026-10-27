import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const beat = {
  id: "01a17ee9-3a1f-7aac-8940-082bf60d38e6",
  type: "page-type/argument",
  slug: "beat",
  said: "--beat",
  takes: "the number of the one beat whose part a step hands in",
  value: "whole-number",
  placeholder: "number",
  createdAt: "2026-10-27T19:49:36.414Z",
  updatedAt: "2026-10-27T19:49:36.414Z",
} as const satisfies Argument
