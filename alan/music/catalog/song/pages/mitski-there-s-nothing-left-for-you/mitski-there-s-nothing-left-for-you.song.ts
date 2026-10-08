import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiThereSNothingLeftForYou = {
  id: "019f0ea4-b0bb-7215-8e55-3c94a85fecaf",
  type: "page-type/song",
  slug: "mitski-there-s-nothing-left-for-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ab62ec1f-0bc4-486f-bd2a-ee4ee8292981",
      externalLink: "https://musicbrainz.org/work/ab62ec1f-0bc4-486f-bd2a-ee4ee8292981",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "There’s Nothing Left for You",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-28T14:31:42.011Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
