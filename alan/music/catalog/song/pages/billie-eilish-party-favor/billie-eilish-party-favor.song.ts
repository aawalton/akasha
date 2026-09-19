import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishPartyFavor = {
  id: "019ea4ab-b15e-79ce-a710-f26ec941014f",
  type: "page-type/song",
  slug: "billie-eilish-party-favor",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dddb35b2-d2fc-4910-85cb-493063450de4",
      externalLink: "https://musicbrainz.org/work/dddb35b2-d2fc-4910-85cb-493063450de4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "party favor",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
