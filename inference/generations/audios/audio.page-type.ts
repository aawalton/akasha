import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"

export const audio = {
  id: "019f189b-018c-74b8-920b-845fe171aee7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "audio",
  definition: "one sound the system has",
  pluralSlug: "audios",
  extends: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An audio's bytes sit in the object store under the audio's own id.",
    },
    {
      invariantKind: "departure",
      statement: "An audio's bytes sit on disk where the audio says those bytes were written.",
    },
    {
      invariantKind: "departure",
      statement: "An audio records where its bytes are rather than the bytes.",
    },
  ],
} as const satisfies PageType

export type Audio = Page
