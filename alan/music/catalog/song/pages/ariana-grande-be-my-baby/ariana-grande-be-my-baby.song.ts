import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBeMyBaby = {
  id: "019ea4e1-c1f8-7c4d-b931-73f40ad47b01",
  type: "page-type/song",
  slug: "ariana-grande-be-my-baby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "72363883-f37f-4c63-a3e9-58fe98956ab6",
      externalLink: "https://musicbrainz.org/work/72363883-f37f-4c63-a3e9-58fe98956ab6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Be My Baby",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
