import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanYoullNeverWalkAlone = {
  id: "01a0b720-1067-7abe-b3a5-4f36e3de7b9e",
  type: "page-type/song",
  slug: "celtic-woman-youll-never-walk-alone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8dee3295-fc9e-37a8-bf72-f2e28c690f98",
      externalLink: "https://musicbrainz.org/work/8dee3295-fc9e-37a8-bf72-f2e28c690f98",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’ll Never Walk Alone",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
