import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayVioletHill = {
  id: "01a0ba60-fc70-72aa-90ff-ff4f418193ba",
  type: "page-type/song",
  slug: "coldplay-violet-hill",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "df4fef4b-e770-324f-a447-1f7a87aa5c24",
      externalLink: "https://musicbrainz.org/work/df4fef4b-e770-324f-a447-1f7a87aa5c24",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Violet Hill",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
