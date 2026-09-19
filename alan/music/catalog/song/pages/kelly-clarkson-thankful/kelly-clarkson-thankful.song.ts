import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonThankful = {
  id: "019ea4b2-e75e-772a-ad5e-72356d35a9dc",
  type: "page-type/song",
  slug: "kelly-clarkson-thankful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8fb30c44-2d17-40ea-90bf-5d3918b9360a",
      externalLink: "https://musicbrainz.org/work/8fb30c44-2d17-40ea-90bf-5d3918b9360a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thankful",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
