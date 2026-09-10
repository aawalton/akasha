import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type ProxyErrors = "log"

export const proxyErrors = {
  id: "01a08c6e-3a04-77d5-8bff-d9d5de6637dd",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "proxy-errors",
  propertySlug: "proxy-errors",
  definition: "what the OAuth proxy a supervisor spawned wrote to its error stream",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "A proxy that died before it opened its console is answered for here.",
    },
    {
      invariantKind: "departure",
      statement: "These errors are kept outside the commit.",
    },
  ],
} as const satisfies FileProperty
