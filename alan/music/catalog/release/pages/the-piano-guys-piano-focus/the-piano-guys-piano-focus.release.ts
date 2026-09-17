import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuysPianoFocus = {
  id: "01a0afa1-c241-769a-91fe-0420b164f6f4",
  type: "page-type/release",
  slug: "the-piano-guys-piano-focus",
  ownLength: 54.12526666666667,
  ownProgress: 0,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2026-08-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5GbjyNIdiJ8ijOsn9rVJL4",
      externalLink: "https://open.spotify.com/album/5GbjyNIdiJ8ijOsn9rVJL4",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Piano Focus",
} as const satisfies Release
