import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishThemeSong = {
  id: "019ea4ac-6a5a-785d-b1c6-ece1b18beef2",
  type: "page-type/song",
  slug: "billie-eilish-theme-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ff565d89-2ea5-45c8-8189-a2453c187635",
      externalLink: "https://musicbrainz.org/work/ff565d89-2ea5-45c8-8189-a2453c187635",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Theme Song",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
