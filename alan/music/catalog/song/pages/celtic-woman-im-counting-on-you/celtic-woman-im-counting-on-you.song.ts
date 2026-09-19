import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanImCountingOnYou = {
  id: "01a0b720-1274-7597-af54-6197f020b313",
  type: "page-type/song",
  slug: "celtic-woman-im-counting-on-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b762217f-79b9-4b3f-8ddb-e03605ae64f5",
      externalLink: "https://musicbrainz.org/work/b762217f-79b9-4b3f-8ddb-e03605ae64f5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I'm Counting on You",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
