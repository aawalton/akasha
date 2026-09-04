import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { GenerationAudios } from "./properties/generation-audios.file-property.ts"
import type { GenerationImages } from "./properties/generation-images.file-property.ts"
import type { GenerationRuns } from "./properties/generation-runs.file-property.ts"

export const generationLog = {
  id: "01a01d18-306b-7000-9796-b41f285a1bad",
  pageTypeSlug: "page-type",
  slug: "generation-log",
  definition: "the standing record of what one set of model services has made",
  pluralSlug: "generation-logs",
  extendsSlug: ["page-type/page"],
  partSlugs: [
    "file-property/generation-audios",
    "file-property/generation-images",
    "file-property/generation-runs",
  ],
  properties: [
    { pagePropertySlug: "generation-runs", required: true, many: false },
    { pagePropertySlug: "generation-images", required: false, many: false },
    { pagePropertySlug: "generation-audios", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A generation log holds its runs and their outputs beside it, rather than filing each on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A log is reached by the slug the inference commands are pointed at.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing lands a row, so the log stands as far as its last hand-written line.",
    },
  ],
} as const satisfies PageType

export type GenerationLog = Page & {
  runs: GenerationRuns
  images?: GenerationImages
  audios?: GenerationAudios
}
