import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDoYouHearWhatIHear = {
  id: "01a0b720-1462-7fbd-b648-35e14c5fe90f",
  type: "page-type/song",
  slug: "celtic-woman-do-you-hear-what-i-hear",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d60f4c0a-8c35-3707-bb52-407e63e33d1f",
      externalLink: "https://musicbrainz.org/work/d60f4c0a-8c35-3707-bb52-407e63e33d1f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Do You Hear What I Hear?",
  artist: "artist/celtic-woman",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
