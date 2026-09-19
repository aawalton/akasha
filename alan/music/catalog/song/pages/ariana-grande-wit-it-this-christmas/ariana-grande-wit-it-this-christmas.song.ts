import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWitItThisChristmas = {
  id: "019ea4e5-3f71-7cba-9d4a-f0d0d6e911e9",
  type: "page-type/song",
  slug: "ariana-grande-wit-it-this-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "52060f41-7b59-47a9-b290-c4118b64fa51",
      externalLink: "https://musicbrainz.org/work/52060f41-7b59-47a9-b290-c4118b64fa51",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wit It This Christmas",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
