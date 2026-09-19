import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySunrise = {
  id: "01a0ba60-fbdc-70cc-816a-af3ad07ec912",
  type: "page-type/song",
  slug: "coldplay-sunrise",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8506e7d-2739-454b-ae46-736cab5eca16",
      externalLink: "https://musicbrainz.org/work/d8506e7d-2739-454b-ae46-736cab5eca16",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sunrise",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
