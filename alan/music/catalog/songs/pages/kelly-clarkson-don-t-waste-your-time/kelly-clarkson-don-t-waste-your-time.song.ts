import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const kellyClarksonDonTWasteYourTime = {
  id: "019ea4ad-779c-7a53-9f3f-f577468b7c14",
  type: "song",
  slug: "kelly-clarkson-don-t-waste-your-time",
  title: "Don't Waste Your Time",
  artist: "artist/kelly-clarkson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "335f3e32-4fe7-444e-9c2a-a6f72f0717ba",
      externalLink: "https://musicbrainz.org/work/335f3e32-4fe7-444e-9c2a-a6f72f0717ba",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
