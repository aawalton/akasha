import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGetOnYourKnees = {
  id: "019ea4e1-38d0-7995-8c1f-910350d3efe5",
  type: "page-type/song",
  slug: "ariana-grande-get-on-your-knees",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "47ef00c7-fe59-4a6e-b937-8a716fc6bf27",
      externalLink: "https://musicbrainz.org/work/47ef00c7-fe59-4a6e-b937-8a716fc6bf27",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Get on Your Knees",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
