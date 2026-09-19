import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYouveGotToBeCarefullyTaught = {
  id: "01a0b72f-52ee-7bfe-8b34-be0453c895f8",
  type: "page-type/song",
  slug: "james-taylor-youve-got-to-be-carefully-taught",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b9216343-f5a0-38a2-91fb-8eda9e759491",
      externalLink: "https://musicbrainz.org/work/b9216343-f5a0-38a2-91fb-8eda9e759491",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’ve Got to Be Carefully Taught",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
