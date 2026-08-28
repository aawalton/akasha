import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const indexRelation = {
  id: "01a04a4a-23e9-77f1-b8ce-68661b5a2925",
  pageTypeSlug: "domain",
  slug: "index-relation",
  definition: "an index from a page to the pages naming it",
  design: [
    "`relation/page/id/{targetId}/{sourcePropertySlug}/{sourcePageId}.jsonl` answers with the page naming it.",
    "An edge is filed under the target's id, whichever identifier the source wrote.",
    "A leaf is named for the source's id, so a landing writes and removes only files it alone owns.",
    "A relation free to name more than one page type carries the page type in its value.",
    "A page's parent is answered here and nowhere else, there being no parent property to read.",
  ],
} as const satisfies Domain
