import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const harnessSettings = {
  id: "01a0657b-ad40-7560-a9d3-d510dfab3cf8",
  type: "file-property",
  slug: "harness-settings",
  propertySlug: "harness-settings",
  definition: "what an agent harness is told before the harness starts",
  extensions: ["json"],
  writtenBy: "module-property-group/telling",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A settings body reaches a harness through akasha code rather than off disk.",
    },
    {
      invariantKind: "departure",
      statement: "A settings body is written by hand apart from the keys akasha derives.",
    },
    {
      invariantKind: "departure",
      statement: "A key akasha derives is absent from the body rather than written by hand.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
