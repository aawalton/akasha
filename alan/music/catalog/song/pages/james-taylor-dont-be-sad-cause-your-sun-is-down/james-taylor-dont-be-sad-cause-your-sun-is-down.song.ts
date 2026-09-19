import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorDontBeSadCauseYourSunIsDown = {
  id: "01a0b72f-23d7-7de6-9503-c00a48053ac0",
  type: "page-type/song",
  slug: "james-taylor-dont-be-sad-cause-your-sun-is-down",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4264019e-7d36-41ef-a944-72d37e796d81",
      externalLink: "https://musicbrainz.org/work/4264019e-7d36-41ef-a944-72d37e796d81",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Don’t Be Sad ’cause Your Sun Is Down",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
