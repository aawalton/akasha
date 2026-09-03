import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionAuthor } from "./properties/collection-author.text-property.ts"
import type { CollectionCompletedAt } from "./properties/collection-completed-at.instant-property.ts"
import type { CollectionDescription } from "./properties/collection-description.text-property.ts"
import type { CollectionPublishedAt } from "./properties/collection-published-at.one-of-property.ts"
import type { CollectionTags } from "./properties/collection-tags.text-property.ts"
import type { Following } from "./properties/following.boolean-property.ts"
import type { OwnLength } from "./properties/own-length.number-property.ts"
import type { OwnProgress } from "./properties/own-progress.number-property.ts"
import type { PartOfSlugs } from "./properties/part-of-slugs.relation-property.ts"
import type { Position } from "./properties/position.number-property.ts"
import type { Rank } from "./properties/rank.rank-property.ts"
import type { Status } from "./properties/status.select-property.ts"
import type { UnitSlug } from "./properties/unit-slug.relation-property.ts"

export type Collection = Page & {
  author?: CollectionAuthor
  completedAt?: CollectionCompletedAt
  description?: CollectionDescription
  following?: Following
  ownLength?: OwnLength
  ownProgress?: OwnProgress
  partOfSlugs?: PartOfSlugs
  position?: Position
  publishedAt?: CollectionPublishedAt
  rank?: Rank
  status?: Status
  tags?: readonly CollectionTags[]
  unitSlug?: UnitSlug
}

export const collection = {
  id: "01a063de-2c60-7006-8395-50a12e499f8e",
  pageTypeSlug: "page-type",
  slug: "collection",
  definition: "something for a person to experience",
  pluralSlug: "collections",
  partSlugs: [
    "boolean-property/following",
    "calendar-date-property/published-day",
    "instant-property/collection-completed-at",
    "instant-property/published-at",
    "number-property/own-length",
    "number-property/own-progress",
    "number-property/position",
    "one-of-property/collection-published-at",
    "page-type/unit",
    "rank-property/rank",
    "relation-property/part-of-slugs",
    "relation-property/unit-slug",
    "select-property/status",
    "text-property/collection-author",
    "text-property/collection-description",
    "text-property/collection-tags",
  ],
  extendsSlug: "page-type/page",
  properties: [
    { pagePropertySlug: "collection-author", required: false, many: false },
    { pagePropertySlug: "collection-completed-at", required: false, many: false },
    { pagePropertySlug: "collection-description", required: false, many: false },
    { pagePropertySlug: "following", required: false, many: false, default: "false" },
    { pagePropertySlug: "own-length", required: false, many: false },
    { pagePropertySlug: "own-progress", required: false, many: false },
    { pagePropertySlug: "part-of-slugs", required: false, many: true, max: null },
    { pagePropertySlug: "position", required: false, many: false },
    { pagePropertySlug: "collection-published-at", required: false, many: false },
    { pagePropertySlug: "rank", required: false, many: false },
    { pagePropertySlug: "status", required: false, many: false },
    { pagePropertySlug: "collection-tags", required: false, many: true, max: null },
    { pagePropertySlug: "unit-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts of a collection are themselves collections.",
    },
    {
      invariantKind: "departure",
      statement: "A collection is part of more than one collection.",
    },
    {
      invariantKind: "departure",
      statement: "No collection is part of itself however far the chain of parts runs.",
    },
    {
      invariantKind: "departure",
      statement:
        "A collection's position is the same in every collection the collection is part of.",
    },
    {
      invariantKind: "upkeep",
      statement: "No collection counts as part of a larger collection twice.",
    },
    {
      invariantKind: "departure",
      statement: "A collection's own length is counted in the unit the collection names.",
    },
    {
      invariantKind: "departure",
      statement: "A collection holding only parts states a length of its own of nothing.",
    },
  ],
} as const satisfies PageType
