import type { Module } from "../modules/module.page-type.ts"

export const carriedFile = {
  id: "01a0693a-5bbe-7eb7-8820-1fde5da86eb5",
  pageTypeSlug: "module",
  slug: "carried-file",
  definition: "how a file that is not text is held in akasha as text beside its page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file that is not text is held as base64 in a json file beside its page.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier states the name a seam writes the bytes under.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier states the byte count and the sha256 of what it carries.",
    },
    {
      invariantKind: "departure",
      statement: "A carrier whose count or digest disagrees with its bytes is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The base64 is one line, so a seam with no json reader takes it in one read.",
    },
    {
      invariantKind: "departure",
      statement: "A json beside-file is judged by the entry ceiling rather than the file ceiling.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the bytes anywhere.",
    },
  ],
} as const satisfies Module
