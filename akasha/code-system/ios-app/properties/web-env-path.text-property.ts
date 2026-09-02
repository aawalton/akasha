import type { TextProperty } from "@akasha/pages-system/text-property"

export type WebEnvPath = string

export const webEnvPath = {
  id: "01a05f87-1b06-7e23-8e4c-c86b56b73813",
  pageTypeSlug: "text-property",
  slug: "web-env-path",
  propertySlug: "web-env-path",
  definition: "where the env file a site is built against lives in the repository",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A worktree missing the file is given a copy of the file at the same path.",
    },
    {
      invariantKind: "departure",
      statement: "An app whose site needs no env file states no path here.",
    },
  ],
} as const satisfies TextProperty
