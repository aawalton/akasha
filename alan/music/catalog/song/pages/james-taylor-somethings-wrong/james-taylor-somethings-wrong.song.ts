import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSomethingsWrong = {
  id: "01a0b72f-5142-771f-9108-9beaa2e92bc8",
  type: "page-type/song",
  slug: "james-taylor-somethings-wrong",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a4e15178-bad6-4256-9979-a575684b8849",
      externalLink: "https://musicbrainz.org/work/a4e15178-bad6-4256-9979-a575684b8849",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Something’s Wrong",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
