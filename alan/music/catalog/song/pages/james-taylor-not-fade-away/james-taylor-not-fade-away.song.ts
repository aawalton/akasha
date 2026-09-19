import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNotFadeAway = {
  id: "01a0b72f-3821-736d-aa96-d069e32757c1",
  type: "page-type/song",
  slug: "james-taylor-not-fade-away",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6394bda2-57a6-3578-badc-f3043d4f0ba8",
      externalLink: "https://musicbrainz.org/work/6394bda2-57a6-3578-badc-f3043d4f0ba8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Not Fade Away",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
