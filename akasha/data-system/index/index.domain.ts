import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const index = {
  id: "01a04a4a-23e9-7114-90a5-11acf49a937d",
  pageTypeSlug: "domain",
  slug: "index",
  definition: "an index of the pages",
  partSlugs: [
    "index-identity",
    "index-relation",
  ],
  requiredReadingSlugs: [
    "index-identity",
    "index-relation",
  ],
  design: [
    "An index file is named for the value it answers, so a value no page carries has no file.",
    "A question the index answers is one file read, never a walk.",
    "A directory holds every file it needs and is divided into no buckets.",
    "The index is written by the write door and by nothing else.",
    "A page property held in its own file is not indexed; its page and property are read off its name.",
  ],
  condition: [
    "The index holds every page.",
  ],
  intent: [
    "A page's entry is written again when a file its properties hold changes.",
    "The index is compared against the pages every day.",
  ],
} as const satisfies Domain
