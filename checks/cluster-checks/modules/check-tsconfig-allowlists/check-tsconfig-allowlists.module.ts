import type { Module } from "@akasha/code/module"

export const checkTsconfigAllowlists = {
  id: "01a08163-7213-7742-a8ea-fbf259efe5f9",
  pageTypeSlug: "module",
  slug: "check-tsconfig-allowlists",
  definition: "the tsconfig departures the tsconfig check lets through, named one by one",
  code: "ts",
} as const satisfies Module
