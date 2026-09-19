import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanShenandoah = {
  id: "01a0b720-09ae-75ca-b6dc-4d41d3dd9e3e",
  type: "page-type/song",
  slug: "celtic-woman-shenandoah",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2b840ea9-1342-3722-8afb-1046b5f295e8",
      externalLink: "https://musicbrainz.org/work/2b840ea9-1342-3722-8afb-1046b5f295e8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shenandoah",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
