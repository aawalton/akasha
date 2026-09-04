import type { FileProperty } from "@akasha/pages-system/file-property"

export type HarnessSettings = "json"

export const harnessSettings = {
  id: "01a0657b-ad40-7560-a9d3-d510dfab3cf8",
  pageTypeSlug: "file-property",
  slug: "harness-settings",
  propertySlug: "harness-settings",
  definition: "what an agent harness is told before the harness starts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A settings body is JSON the harness reads without any akasha code between.",
    },
    {
      invariantKind: "departure",
      statement: "A settings body is written by hand rather than derived from another page.",
    },
  ],
} as const satisfies FileProperty
