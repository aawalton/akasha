import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsItSTime = {
  id: "019ea499-3988-7fba-a81f-84a85a26f967",
  type: "page-type/song",
  slug: "imagine-dragons-it-s-time",
  rank: "B+",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7acb0e37-2575-405a-95e4-a91057d50ae1",
      externalLink: "https://musicbrainz.org/work/7acb0e37-2575-405a-95e4-a91057d50ae1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It’s Time",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  singability: "A",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
