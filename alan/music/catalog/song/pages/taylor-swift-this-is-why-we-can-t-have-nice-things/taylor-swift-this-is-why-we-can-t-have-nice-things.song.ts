import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThisIsWhyWeCanTHaveNiceThings = {
  id: "019ea416-45f4-7c7d-8f6f-aed1b20f2e1d",
  type: "page-type/song",
  slug: "taylor-swift-this-is-why-we-can-t-have-nice-things",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b9c4215-654a-4de0-858a-7693bcea9ce9",
      externalLink: "https://musicbrainz.org/work/5b9c4215-654a-4de0-858a-7693bcea9ce9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "This Is Why We Can’t Have Nice Things",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
