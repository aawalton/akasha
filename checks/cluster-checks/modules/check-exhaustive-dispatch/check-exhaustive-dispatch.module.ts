import type { Module } from "@akasha/code/module"

export const checkExhaustiveDispatch = {
  id: "01a0815e-a747-7821-85ac-85f4ce7d4192",
  pageTypeSlug: "module",
  slug: "check-exhaustive-dispatch",
  definition: "the run refusing a switch statement that carries no conforming default clause",
  code: "ts",
} as const satisfies Module
