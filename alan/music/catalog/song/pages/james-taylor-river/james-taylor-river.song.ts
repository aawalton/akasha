import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRiver = {
  id: "01a0b72f-3357-791c-b4fe-be92959055c8",
  type: "page-type/song",
  slug: "james-taylor-river",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23086b1a-3b60-3d75-b5ba-81370642cfb8",
      externalLink: "https://musicbrainz.org/work/23086b1a-3b60-3d75-b5ba-81370642cfb8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "River",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
