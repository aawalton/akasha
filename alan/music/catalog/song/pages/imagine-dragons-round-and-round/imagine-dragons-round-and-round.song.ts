import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsRoundAndRound = {
  id: "019ea49c-87f9-731f-8e4e-f6fa8eef6984",
  type: "page-type/song",
  slug: "imagine-dragons-round-and-round",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8c1914ed-b1bf-43e4-a71a-6129e502bb22",
      externalLink: "https://musicbrainz.org/work/8c1914ed-b1bf-43e4-a71a-6129e502bb22",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Round and Round",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
