import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBadIdea = {
  id: "019ea4e1-13f0-7382-b98d-a519d85a6546",
  type: "page-type/song",
  slug: "ariana-grande-bad-idea",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ae9c039-fb9e-401a-b38a-6a45534fa3ba",
      externalLink: "https://musicbrainz.org/work/3ae9c039-fb9e-401a-b38a-6a45534fa3ba",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "bad idea",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
