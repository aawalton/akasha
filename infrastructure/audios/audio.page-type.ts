import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export const audio = {
  id: "019f189b-018c-74b8-920b-845fe171aee7",
  pageTypeSlug: "page-type",
  slug: "audio",
  definition: "one sound the system holds",
  pluralSlug: "audios",
  extendsSlug: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An audio's bytes stand in the object store under the audio's own id, and on disk where the audio says they were written.",
    },
    {
      invariantKind: "departure",
      statement: "An audio records where its bytes stand, never the bytes.",
    },
  ],
} as const satisfies PageType

export type Audio = Page
