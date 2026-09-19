import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHowYouSeeTheWorldNo2 = {
  id: "01a0ba5d-3f3d-739c-a1dc-a1a8e0819467",
  type: "page-type/song",
  slug: "coldplay-how-you-see-the-world-no-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "79957d7c-ea22-4d86-b80d-172e07d04a72",
      externalLink: "https://musicbrainz.org/work/79957d7c-ea22-4d86-b80d-172e07d04a72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How You See the World No. 2",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
