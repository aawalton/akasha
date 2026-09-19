import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOverTheRainbow = {
  id: "019ea4e8-8d5d-79b7-abff-c5234b658273",
  type: "page-type/song",
  slug: "ariana-grande-over-the-rainbow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f8217125-b460-3902-8903-82979e3785ee",
      externalLink: "https://musicbrainz.org/work/f8217125-b460-3902-8903-82979e3785ee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Over the Rainbow",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
