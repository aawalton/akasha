import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishGettingOlder = {
  id: "019ea4a9-870a-798d-af85-ef5955ea122e",
  type: "page-type/song",
  slug: "billie-eilish-getting-older",
  rank: "A+",
  tags: ["abuse"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "543b7d16-5083-4618-ad8e-9fed1c8fba78",
      externalLink: "https://musicbrainz.org/work/543b7d16-5083-4618-ad8e-9fed1c8fba78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Getting Older",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A-",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
