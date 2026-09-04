import type { Module } from "@akasha/code-system/module"

export const outputTee = {
  id: "01a068dd-71dc-7728-9e05-545c5fbcacec",
  pageTypeSlug: "module",
  slug: "output-tee",
  definition: "a child process's output copied to a file and to the console at once",
  code: "ts",
} as const satisfies Module
