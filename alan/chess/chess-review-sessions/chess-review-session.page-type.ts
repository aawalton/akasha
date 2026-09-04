import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../temper/temper-things/properties/title.text-property.ts"
import type { ChessGameSlug } from "./properties/chess-game-slug.relation-property.ts"
import type { ChessReviewSessionNotes } from "./properties/chess-review-session-notes.file-property.ts"
import type { ReviewedAt } from "./properties/reviewed-at.instant-property.ts"

export type ChessReviewSession = Page & {
  title: Title
  chessGameSlug: ChessGameSlug
  reviewedAt: ReviewedAt
  notes: ChessReviewSessionNotes
}

export const chessReviewSession = {
  id: "019f1e54-024f-7c0b-9c78-d44a2a2e9f2e",
  pageTypeSlug: "page-type",
  slug: "chess-review-session",
  definition: "one game stepped through move by move with the coach",
  pluralSlug: "chess-review-sessions",
  extendsSlug: "page-type/page",
  partSlugs: [
    "file-property/chess-review-session-notes",
    "instant-property/reviewed-at",
    "relation-property/chess-game-slug",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "chess-game-slug", required: true, many: false },
    { pagePropertySlug: "reviewed-at", required: true, many: false },
    { pagePropertySlug: "chess-review-session-notes", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One game stepped through with the coach is one session.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session names the game stepped through rather than the persona who stepped through that game.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session's notes are a file beside the session rather than inside the session page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A session is marked at the moment of the stepping through rather than at the day.",
    },
    {
      invariantKind: "gap",
      statement: "A session names the persona who coached that session.",
    },
  ],
} as const satisfies PageType
