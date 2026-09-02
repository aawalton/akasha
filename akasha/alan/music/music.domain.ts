import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const music = {
  id: "01a06222-4d01-78f8-8ed6-e3f5ec16f8a3",
  pageTypeSlug: "domain",
  slug: "music",
  definition: "music heard and what is kept of it",
  pluralSlug: "music",
  partSlugs: [
    "domain/music-catalog",
    "domain/music-listening",
    "workspace-package/music-choosing",
    "workspace-package/spotify",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every kind of thing music keeps has a page type of its own.",
    },
    {
      invariantKind: "departure",
      statement: "Music keeps what was made apart from what was heard.",
    },
  ],
} as const satisfies Domain
