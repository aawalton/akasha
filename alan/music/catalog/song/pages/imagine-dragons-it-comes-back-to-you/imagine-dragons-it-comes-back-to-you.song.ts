import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsItComesBackToYou = {
  id: "019ea496-afee-71ee-822f-dc090e5d3577",
  type: "page-type/song",
  slug: "imagine-dragons-it-comes-back-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0528b209-24ad-44ae-a83b-a60f531497bb",
      externalLink: "https://musicbrainz.org/work/0528b209-24ad-44ae-a83b-a60f531497bb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It Comes Back to You",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
