import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaILoveItTrialsRemix = {
  id: "01a0ba9e-1cf9-75fd-a082-2383e1fd4f3e",
  type: "page-type/song",
  slug: "sia-i-love-it-trials-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "756184d3-fba9-4ae2-8ff8-00b60508b753",
      externalLink: "https://musicbrainz.org/work/756184d3-fba9-4ae2-8ff8-00b60508b753",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Love It (Trials remix)",
  artist: "artist/sia",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
