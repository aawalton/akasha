import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeDaydreamin = {
  id: "019ea4e3-2295-7008-8236-45c3359d37e1",
  type: "page-type/song",
  slug: "ariana-grande-daydreamin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c788d6b1-258a-459f-8907-6eb47d5c67d3",
      externalLink: "https://musicbrainz.org/work/c788d6b1-258a-459f-8907-6eb47d5c67d3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Daydreamin’",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
