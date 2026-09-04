import type { Module } from "@akasha/code-system/module"

export const corsCore = {
  id: "01a06863-8e7c-7a4c-808c-4834fedcab58",
  pageTypeSlug: "module",
  slug: "cors-core",
  definition: "an origin weighed against what is allowed, and the headers saying so",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An origin the list holds or a pattern matches is allowed.",
    },
    {
      invariantKind: "departure",
      statement: "An answer to an origin that is not allowed carries no header of its own.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that varies by origin says so.",
    },
  ],
} as const satisfies Module
