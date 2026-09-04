import type { Module } from "@akasha/code-system/module"

export const cors = {
  id: "01a06863-8e7c-7ff0-95ea-2e1024563925",
  pageTypeSlug: "module",
  slug: "cors",
  definition: "this proxy's allowed origins put to a request and to its preflight",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A preflight is answered here rather than by what is behind the proxy.",
    },
    {
      invariantKind: "departure",
      statement: "A preflight echoes back the headers the request asked about.",
    },
  ],
} as const satisfies Module
