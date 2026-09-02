import type { Module } from "@akasha/code-system/module"

export const proxyHeaders = {
  id: "01a0622f-4550-7230-9809-915f90bdb897",
  pageTypeSlug: "module",
  slug: "proxy-headers",
  definition: "the headers copied across a proxy hop",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request drops every hop-by-hop header.",
    },
    {
      invariantKind: "departure",
      statement: "A request drops its `authorization` header.",
    },
    {
      invariantKind: "departure",
      statement: "A request drops its `host` header.",
    },
    {
      invariantKind: "departure",
      statement: "Neither direction copies `content-length`.",
    },
    {
      invariantKind: "departure",
      statement: "A response drops `content-encoding`.",
    },
    {
      invariantKind: "departure",
      statement: "A header no list names is copied with its value unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A header is matched against a list in lower case.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here adds a header that did not arrive.",
    },
    {
      invariantKind: "departure",
      statement: "A response drops every hop-by-hop header.",
    },
    {
      invariantKind: "departure",
      statement: "A response carrying several `set-cookie` headers copies every one.",
    },
  ],
} as const satisfies Module
