import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheBoyIsMineRemix = {
  id: "01a0ba8d-98aa-7a89-a1c9-c510fd000594",
  type: "page-type/song",
  slug: "ariana-grande-the-boy-is-mine-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e159959d-8701-41da-b22a-f9dbf6daf22a",
      externalLink: "https://musicbrainz.org/work/e159959d-8701-41da-b22a-f9dbf6daf22a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "the boy is mine (remix)",
  artist: "artist/ariana-grande",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
