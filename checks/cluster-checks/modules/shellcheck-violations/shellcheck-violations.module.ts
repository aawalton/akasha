import type { Module } from "@akasha/code/module"

export const shellcheckViolations = {
  id: "01a08179-4c5c-75f3-89c2-e7ec8b6721b6",
  pageTypeSlug: "module",
  slug: "shellcheck-violations",
  definition: "the comments one shellcheck run reports over a script, read from its json1 output",
  code: "ts",
} as const satisfies Module
