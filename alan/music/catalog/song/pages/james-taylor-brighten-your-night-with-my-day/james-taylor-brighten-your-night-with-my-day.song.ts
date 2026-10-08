import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBrightenYourNightWithMyDay = {
  id: "01a0b72f-30d5-7981-bbbf-ba21c8e5ab21",
  type: "page-type/song",
  slug: "james-taylor-brighten-your-night-with-my-day",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ec59737d-f883-4cfe-b3ee-d3200d92846c",
      externalLink: "https://musicbrainz.org/work/ec59737d-f883-4cfe-b3ee-d3200d92846c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Brighten Your Night With My Day",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:01:58.357Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
