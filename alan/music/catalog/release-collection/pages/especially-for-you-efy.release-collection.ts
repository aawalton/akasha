import type { ReleaseCollection } from "akasha/alan/music/catalog/release-collection/release-collection.page-type.types.ts"

export const especiallyForYouEfy = {
  id: "01a06808-805e-7000-b4ce-7ce02b996bd4",
  type: "page-type/release-collection",
  slug: "especially-for-you-efy",
  title: "Especially For You (EFY)",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "B",
} as const satisfies ReleaseCollection
