import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishEverythingIWanted = {
  id: "019ea4aa-916e-7864-afdd-c795d9b6b656",
  type: "page-type/song",
  slug: "billie-eilish-everything-i-wanted",
  rank: "S",
  tags: ["suicide"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "925e99ae-619a-4bb0-9799-2de17ab68bec",
      externalLink: "https://musicbrainz.org/work/925e99ae-619a-4bb0-9799-2de17ab68bec",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "everything i wanted",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
