import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWhatIsThisFeeling = {
  id: "019ea4e8-169c-705e-b82a-d3e835b79843",
  type: "page-type/song",
  slug: "ariana-grande-what-is-this-feeling",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e99ac88f-c050-4d2e-af2d-d19bbcfa8da8",
      externalLink: "https://musicbrainz.org/work/e99ac88f-c050-4d2e-af2d-d19bbcfa8da8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "What Is This Feeling?",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:45:34.108Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
