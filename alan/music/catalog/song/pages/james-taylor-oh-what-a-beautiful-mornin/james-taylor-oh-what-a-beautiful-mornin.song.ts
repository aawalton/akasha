import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOhWhatABeautifulMornin = {
  id: "01a0b72f-37b2-73f4-a04f-f071a0714734",
  type: "page-type/song",
  slug: "james-taylor-oh-what-a-beautiful-mornin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "61f7d80a-7e3b-459c-af2a-df471c682c01",
      externalLink: "https://musicbrainz.org/work/61f7d80a-7e3b-459c-af2a-df471c682c01",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Oh, What a Beautiful Mornin’",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
