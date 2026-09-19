import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSongForTheMira = {
  id: "01a0b720-0b9c-7059-95c5-bb1abdb0840f",
  type: "page-type/song",
  slug: "celtic-woman-song-for-the-mira",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "47b97be5-500d-496d-9ddd-e3bb95be8d41",
      externalLink: "https://musicbrainz.org/work/47b97be5-500d-496d-9ddd-e3bb95be8d41",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Song for the Mira",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
