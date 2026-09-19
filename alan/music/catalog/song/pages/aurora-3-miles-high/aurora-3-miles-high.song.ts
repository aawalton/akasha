import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const aurora3MilesHigh = {
  id: "019ea4a7-a918-7fa9-a13d-f317a4b79127",
  type: "page-type/song",
  slug: "aurora-3-miles-high",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f6067b6d-991a-4895-bb1c-ccd1d06251df",
      externalLink: "https://musicbrainz.org/work/f6067b6d-991a-4895-bb1c-ccd1d06251df",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "3 Miles High",
  artist: "artist/aurora",
  performed: false,
  written: "collab",
} as const satisfies Song
