import type { Module } from "@akasha/code-system/module"

export const httpBackend = {
  id: "01a06816-2f11-7e5b-9f14-546cff64fb03",
  pageTypeSlug: "module",
  slug: "http-backend",
  definition: "a request handed to the git http backend, and the answer streamed back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The backend is started in a process group of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The group is killed once the answer's body closes.",
    },
    {
      invariantKind: "departure",
      statement: "A gzipped body is decompressed before the backend is fed it.",
    },
    {
      invariantKind: "departure",
      statement: "The headers are read up to the first blank line and the rest is the body.",
    },
    {
      invariantKind: "departure",
      statement: "A status header sets the answer's code rather than becoming a header.",
    },
    {
      invariantKind: "departure",
      statement: "A backend that failed is said on standard error rather than to the caller.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that gave up cancels the answer and takes the backend down with it.",
    },
  ],
} as const satisfies Module
