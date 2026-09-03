import type { Module } from "@akasha/code-system/module"

export const seatNameBind = {
  id: "01a0695a-d2ea-71ce-9f9d-691f656eb49b",
  pageTypeSlug: "module",
  slug: "seat-name-bind",
  definition:
    "a name checked before a seat takes it, and a new agent id made under one that is free",
  code: "ts",
} as const satisfies Module
