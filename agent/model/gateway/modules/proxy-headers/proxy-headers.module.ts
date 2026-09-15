import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proxyHeaders = {
  id: "01a0622f-4550-7230-9809-915f90bdb897",
  type: "page-type/module",
  slug: "proxy-headers",
  definition: "the headers copied across a proxy hop",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request drops every hop-by-hop header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request drops its `authorization` header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request drops its `host` header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Neither direction copies `content-length`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response drops `content-encoding`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A header no list names is copied with its value unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A header is matched against a list in lower case.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here adds a header that did not arrive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response drops every hop-by-hop header.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response with several `set-cookie` headers copies every header.",
    },
  ],
} as const satisfies Module
