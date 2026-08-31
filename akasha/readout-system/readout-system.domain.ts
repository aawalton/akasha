import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const readoutSystem = {
  id: "01a05446-e75c-73a6-9442-0919b16723c0",
  pageTypeSlug: "domain",
  slug: "readout-system",
  definition: "how a reading reaches the person it is for",
  partSlugs: [
    "page-type/readout",
    "page-type/readout-group",
    "page-type/readout-scale",
    "page-type/readout-widget",
    "module/readout-credential",
    "module/readout-reading",
  ],
} as const satisfies Domain
