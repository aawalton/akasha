import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiTheDeal = {
  id: "019f0e9c-b750-7ce5-8443-6acbe0dce022",
  type: "page-type/song",
  slug: "mitski-the-deal",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "12b1bf0f-2e7d-4d73-98e1-bc042a4f51d0",
      externalLink: "https://musicbrainz.org/work/12b1bf0f-2e7d-4d73-98e1-bc042a4f51d0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Deal",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
