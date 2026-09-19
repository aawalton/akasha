import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOneWorld = {
  id: "01a0b720-12ee-72cc-8e6b-6e839b22c604",
  type: "page-type/song",
  slug: "celtic-woman-one-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bfe6b9b5-23fb-344b-a73e-fa88842e6f8a",
      externalLink: "https://musicbrainz.org/work/bfe6b9b5-23fb-344b-a73e-fa88842e6f8a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One World",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
