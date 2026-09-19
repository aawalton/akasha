import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonThereSANewKidInTown = {
  id: "019ea4b1-86ee-7e0e-9088-69849035eeb4",
  type: "page-type/song",
  slug: "kelly-clarkson-there-s-a-new-kid-in-town",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "18fbe723-0ac7-4183-8fd7-cd4404aab010",
      externalLink: "https://musicbrainz.org/work/18fbe723-0ac7-4183-8fd7-cd4404aab010",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "There's a New Kid in Town",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
