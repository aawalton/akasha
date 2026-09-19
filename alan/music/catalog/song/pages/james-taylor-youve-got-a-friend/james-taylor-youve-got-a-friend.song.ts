import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYouveGotAFriend = {
  id: "01a0b72f-596c-7bec-8a43-dba87a862a27",
  type: "page-type/song",
  slug: "james-taylor-youve-got-a-friend",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f71730f0-062f-3da5-8086-6fb07fea1839",
      externalLink: "https://musicbrainz.org/work/f71730f0-062f-3da5-8086-6fb07fea1839",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’ve Got a Friend",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
