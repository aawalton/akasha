import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSomeKindOfMiracle = {
  id: "019ea4b2-3d2b-7ded-99dc-ae08cd037974",
  type: "page-type/song",
  slug: "kelly-clarkson-some-kind-of-miracle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c90a316-d3ee-463e-9d05-1888d6ea637a",
      externalLink: "https://musicbrainz.org/work/4c90a316-d3ee-463e-9d05-1888d6ea637a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Some Kind of Miracle",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
