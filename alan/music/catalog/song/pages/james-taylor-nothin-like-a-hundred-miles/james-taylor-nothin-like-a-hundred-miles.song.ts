import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNothinLikeAHundredMiles = {
  id: "01a0b72f-43ef-7abc-8f93-c10e8d9dac50",
  type: "page-type/song",
  slug: "james-taylor-nothin-like-a-hundred-miles",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e9bb29b5-c755-4168-b637-ba1b67d89529",
      externalLink: "https://musicbrainz.org/work/e9bb29b5-c755-4168-b637-ba1b67d89529",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nothin’ Like a Hundred Miles",
  artist: "artist/james-taylor",
  performed: true,
  written: "solo",
  createdAt: "2026-09-19T01:02:03.247Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
