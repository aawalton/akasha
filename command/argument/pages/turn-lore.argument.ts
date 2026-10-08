import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const turnLore = {
  id: "01a0deca-7611-7961-96ce-a03603e7466b",
  type: "page-type/argument",
  slug: "turn-lore",
  said: "--lore",
  takes: "a lore page the world builder landed for the turn, named by its address",
  value: "text",
  placeholder: "address",
  createdAt: "2026-09-26T17:36:45.585Z",
  updatedAt: "2026-09-26T17:36:57.000Z",
} as const satisfies Argument
