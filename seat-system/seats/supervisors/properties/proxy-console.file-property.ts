import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type ProxyConsole = "log"

export const proxyConsole = {
  id: "01a08c6e-23a4-720b-8305-ae715f2c5aa5",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "proxy-console",
  propertySlug: "proxy-console",
  definition: "what the OAuth proxy a supervisor spawned wrote to its console",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "departure",
      statement: "The proxy writes this and the supervisor names where it goes.",
    },
    {
      invariantKind: "departure",
      statement: "This console is kept outside the commit.",
    },
  ],
} as const satisfies FileProperty
