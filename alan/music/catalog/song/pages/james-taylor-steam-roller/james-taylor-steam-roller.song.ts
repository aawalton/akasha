import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSteamRoller = {
  id: "01a0b72f-4bd0-7957-b366-85dbb42d652d",
  type: "page-type/song",
  slug: "james-taylor-steam-roller",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "50aa5959-0eac-43e1-8784-28501f01fd59",
      externalLink: "https://musicbrainz.org/work/50aa5959-0eac-43e1-8784-28501f01fd59",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Steam Roller",
  artist: "artist/james-taylor",
  songType: "original",
  performed: false,
  written: "solo",
} as const satisfies Song
