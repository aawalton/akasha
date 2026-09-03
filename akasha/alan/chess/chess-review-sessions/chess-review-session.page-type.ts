import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Notes } from "../../../persona-system/review-sessions/properties/notes.file-property.ts"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { ChessGameSlug } from "./properties/chess-game-slug.relation-property.ts"
import type { ReviewedAt } from "./properties/reviewed-at.instant-property.ts"

export type ChessReviewSession = Page & {
  title: Title
  chessGameSlug: ChessGameSlug
  reviewedAt: ReviewedAt
  notes: Notes
}

export const chessReviewSession = {
  id: "019f1e54-024f-7c0b-9c78-d44a2a2e9f2e",
  pageTypeSlug: "page-type",
  slug: "chess-review-session",
  definition: "one game stepped through move by move with the coach",
  pluralSlug: "chess-review-sessions",
  extendsSlug: "page-type/page",
  partSlugs: [
    "file-property/notes",
    "instant-property/reviewed-at",
    "relation-property/chess-game-slug",
    "text-property/title",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "chess-game-slug", required: true, many: false },
    { pagePropertySlug: "reviewed-at", required: true, many: false },
    { pagePropertySlug: "notes", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One game stepped through with the coach is one session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session names the game it stepped through rather than the persona who stepped through it.",
    },
    {
      invariantKind: "departure",
      statement: "A session's notes are a file beside the session rather than in it.",
    },
    {
      invariantKind: "departure",
      statement: "A session is marked at the moment it was stepped through rather than at the day.",
    },
    {
      invariantKind: "gap",
      statement: "A session names the persona who coached it.",
    },
  ],
} as const satisfies PageType
