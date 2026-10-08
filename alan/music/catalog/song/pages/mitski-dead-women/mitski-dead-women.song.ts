import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiDeadWomen = {
  id: "019f0ea4-e5d2-7760-b243-207a87beffdb",
  type: "page-type/song",
  slug: "mitski-dead-women",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "af80f7b8-0368-4fa9-a6f7-3091b486ec1d",
      externalLink: "https://musicbrainz.org/work/af80f7b8-0368-4fa9-a6f7-3091b486ec1d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dead Women",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-28T14:31:55.602Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
