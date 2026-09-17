import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3WhenYouReGone = {
  id: "01a0676a-d731-7005-96c6-154f3809b84c",
  type: "page-type/release",
  slug: "the-piano-guys-3-when-you-re-gone",
  ownLength: 10.722416666666666,
  ownProgress: 10.722417,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-08-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GPAKadyjDdIAYEzDVKvyp",
      externalLink: "https://open.spotify.com/album/5GPAKadyjDdIAYEzDVKvyp",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "When You're Gone",
} as const satisfies Release
