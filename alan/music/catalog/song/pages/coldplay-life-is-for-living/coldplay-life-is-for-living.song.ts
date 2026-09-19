import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLifeIsForLiving = {
  id: "01a0ba60-f6a6-7629-85df-1a656a4553f2",
  type: "page-type/song",
  slug: "coldplay-life-is-for-living",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a9ba1b76-a2f0-4ba8-90b0-b24fc867aadb",
      externalLink: "https://musicbrainz.org/work/a9ba1b76-a2f0-4ba8-90b0-b24fc867aadb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Life Is for Living",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
