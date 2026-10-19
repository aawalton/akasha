import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixAtHome2Cologne = {
  id: "01a1546f-24f3-7ef5-8fd2-77701b66fb14",
  type: "page-type/track",
  slug: "pentatonix-at-home-2-cologne",
  ownLength: 3.0782833333333333,
  ownProgress: 3.0782833333333333,
  partOfCollections: ["release/pentatonix-at-home-2", "release/pentatonix-at-home"],
  status: "completed",
  unit: "unit/minutes",
  title: "Cologne",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "cologne|26AHtbjWKiwYzsoGoUZq53|184697",
  song: "song/pentatonix-cologne",
  carriedBy: [
    {
      release: "release/pentatonix-at-home",
      discNumber: 1,
      position: 5,
      externalId: "7dKDLRbX8mNkVPXsgKzYKO",
      externalLink: "https://open.spotify.com/track/7dKDLRbX8mNkVPXsgKzYKO",
    },
    {
      release: "release/pentatonix-at-home-2",
      discNumber: 1,
      position: 5,
      externalId: "1tEuUfxrfUKzvGroxuUT5Z",
      externalLink: "https://open.spotify.com/track/1tEuUfxrfUKzvGroxuUT5Z",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
