import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionAuthor } from "./properties/collection-author.text-property.ts"
import type { CollectionCompletedAt } from "./properties/collection-completed-at.instant-property.ts"
import type { CollectionDescription } from "./properties/collection-description.text-property.ts"
import type { CollectionPublishedAt } from "./properties/collection-published-at.one-of-property.ts"
import type { CollectionTags } from "./properties/collection-tags.text-property.ts"
import type { CollectionTypeSlug } from "./properties/collection-type-slug.relation-property.ts"
import type { Following } from "./properties/following.boolean-property.ts"
import type { OwnLength } from "./properties/own-length.number-property.ts"
import type { OwnProgress } from "./properties/own-progress.number-property.ts"
import type { PartOfSlugs } from "./properties/part-of-slugs.relation-property.ts"
import type { PartsLengthInWords } from "./properties/parts-length-in-words.number-property.ts"
import type { PartsProgressInWords } from "./properties/parts-progress-in-words.number-property.ts"
import type { Position } from "./properties/position.number-property.ts"
import type { Rank } from "./properties/rank.rank-property.ts"
import type { Status } from "./properties/status.select-property.ts"
import type { UnitSlug } from "./properties/unit-slug.relation-property.ts"
import type { UnitWords } from "./properties/unit-words.number-property.ts"

export type Collection = Page & {
  author?: CollectionAuthor
  completedAt?: CollectionCompletedAt
  description?: CollectionDescription
  following?: Following
  ownLength?: OwnLength
  ownProgress?: OwnProgress
  partOfSlugs?: PartOfSlugs
  partsLengthInWords?: PartsLengthInWords
  partsProgressInWords?: PartsProgressInWords
  position?: Position
  publishedAt?: CollectionPublishedAt
  rank?: Rank
  status?: Status
  tags?: readonly CollectionTags[]
  unitSlug?: UnitSlug
  unitWords?: UnitWords
  collectionTypeSlug?: CollectionTypeSlug
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
    "formula-property/collection-completion",
    "formula-property/own-length-in-words",
    "formula-property/own-progress-in-words",
    "formula-property/own-remaining",
    "formula-property/own-remaining-in-words",
    "formula-property/parts-remaining-in-words",
    "formula-property/total-length",
    "formula-property/total-length-in-words",
    "formula-property/total-progress",
    "formula-property/total-progress-in-words",
    "formula-property/total-remaining",
    "formula-property/total-remaining-in-words",
    "instant-property/collection-completed-at",
    "instant-property/published-at",
    "number-property/own-length",
    "number-property/own-progress",
    "number-property/parts-length-in-words",
    "number-property/parts-progress-in-words",
    "number-property/position",
    "number-property/unit-words",
    "one-of-property/collection-published-at",
    "page-type/unit",
    "rank-property/rank",
    "relation-property/collection-type-slug",
    "relation-property/part-of-slugs",
    "relation-property/unit-slug",
    "select-property/status",
    "text-property/collection-author",
    "text-property/collection-description",
    "text-property/collection-tags",
  ],
  extendsSlug: ["page-type/page"],
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
    { pagePropertySlug: "collection-completion", required: false, many: false },
    { pagePropertySlug: "collection-type-slug", required: false, many: false },
    { pagePropertySlug: "own-length-in-words", required: false, many: false },
    { pagePropertySlug: "own-progress-in-words", required: false, many: false },
    { pagePropertySlug: "own-remaining", required: false, many: false },
    { pagePropertySlug: "own-remaining-in-words", required: false, many: false },
    { pagePropertySlug: "parts-remaining-in-words", required: false, many: false },
    { pagePropertySlug: "total-length", required: false, many: false },
    { pagePropertySlug: "total-length-in-words", required: false, many: false },
    { pagePropertySlug: "total-progress", required: false, many: false },
    { pagePropertySlug: "total-progress-in-words", required: false, many: false },
    { pagePropertySlug: "total-remaining", required: false, many: false },
    { pagePropertySlug: "total-remaining-in-words", required: false, many: false },
    { pagePropertySlug: "parts-length-in-words", required: false, many: false },
    { pagePropertySlug: "parts-progress-in-words", required: false, many: false },
    { pagePropertySlug: "unit-words", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The parts of a collection are themselves collections.",
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
    {
      invariantKind: "departure",
      statement: "A collection's own progress never runs past that collection's own length.",
    },
  ],
} as const satisfies PageType
