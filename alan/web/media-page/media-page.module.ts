import type { Module } from "@akasha/code/module"

export const mediaPage = {
  id: "01a0655d-daa7-77e5-94c7-6372a1f52830",
  pageTypeSlug: "module",
  slug: "media-page",
  definition: "a page carrying media, resolved from what a media address names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A `mock.module` replacement reaches the whole process and outlives the file installing it.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A mock put up as a test file is imported is in front of every test file bun runs after it.",
    },
    {
      invariantKind: "departure",
      statement:
        "This module's test puts its mocks up in `beforeAll` and takes them down in `afterAll`.",
    },
    {
      invariantKind: "departure",
      statement:
        "This module's test mocks the object store, so no reader here reaches a store over the network.",
    },
    {
      invariantKind: "departure",
      statement: "A reader handed no object store answers rather than refusing.",
    },
  ],
} as const satisfies Module
