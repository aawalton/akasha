import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorTheSecondStarToTheRight = {
  id: "01a0b72f-5163-700f-a1bc-923ac53eb970",
  type: "page-type/song",
  slug: "james-taylor-the-second-star-to-the-right",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a72fb6a8-cdeb-38fb-a891-239e5f79245d",
      externalLink: "https://musicbrainz.org/work/a72fb6a8-cdeb-38fb-a891-239e5f79245d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Second Star to the Right",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
