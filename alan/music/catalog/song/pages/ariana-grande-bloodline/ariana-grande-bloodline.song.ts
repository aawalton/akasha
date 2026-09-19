import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBloodline = {
  id: "019ea4e1-79b3-7ce3-9f6d-f43d65f34fce",
  type: "page-type/song",
  slug: "ariana-grande-bloodline",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "609f0077-a1f8-43a0-8639-7084bec50f16",
      externalLink: "https://musicbrainz.org/work/609f0077-a1f8-43a0-8639-7084bec50f16",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "bloodline",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
