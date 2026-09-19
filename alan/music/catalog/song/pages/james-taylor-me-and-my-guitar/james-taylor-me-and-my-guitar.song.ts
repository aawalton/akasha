import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMeAndMyGuitar = {
  id: "01a0b72f-36c2-7aa1-a007-13ebfb734eef",
  type: "page-type/song",
  slug: "james-taylor-me-and-my-guitar",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "51919694-7c88-4b0f-a343-d1ba62e363ec",
      externalLink: "https://musicbrainz.org/work/51919694-7c88-4b0f-a343-d1ba62e363ec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Me and My Guitar",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
