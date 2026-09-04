import type { Module } from "@akasha/code-system/module"

export const filePageName = {
  id: "01a05bd6-c52f-759b-9a61-c0fad7a06d57",
  pageTypeSlug: "module",
  slug: "file-page-name",
  definition: "the name a file-backed page is known by, worked out from its id",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An id that is no uuid is answered malformed before any page is looked for.",
    },
    {
      invariantKind: "departure",
      statement: "A malformed id says the caller holds the wrong value.",
    },
    {
      invariantKind: "gap",
      statement: "Every well-formed id is answered unasked.",
    },
    {
      invariantKind: "absence",
      statement: "`@akasha/pages-system-service` reports no path for a row.",
    },
    {
      invariantKind: "absence",
      statement: "No file name is worked out from a path.",
    },
    {
      invariantKind: "absence",
      statement: "A page is never reported absent by a translation that looked at nothing.",
    },
  ],
} as const satisfies Module
