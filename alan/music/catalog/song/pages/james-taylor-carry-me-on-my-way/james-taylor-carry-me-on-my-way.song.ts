import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCarryMeOnMyWay = {
  id: "01a0b72f-2e2d-7cff-a0b6-312321838909",
  type: "page-type/song",
  slug: "james-taylor-carry-me-on-my-way",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c2d39d1c-5e0d-476f-9f95-242001e3c54b",
      externalLink: "https://musicbrainz.org/work/c2d39d1c-5e0d-476f-9f95-242001e3c54b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Carry Me on My Way",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
