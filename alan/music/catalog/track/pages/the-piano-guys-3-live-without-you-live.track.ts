import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveWithoutYouLive = {
  id: "01a0afa2-1399-7039-a103-605a00691369",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-without-you-live",
  ownLength: 3.756883333333333,
  ownProgress: 3.756883333333333,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Without You (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Peter Hollens" }],
  trackKey: "withoutyoulive|0jW6R8CVyVohuUJVcuweDI,7EIbKyiLnEJ1Y074UIUyZJ|225413",
  song: "song/the-piano-guys-without-you",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 6,
      externalId: "60BIoMVVWN8RA3UYXIK6SE",
      externalLink: "https://open.spotify.com/track/60BIoMVVWN8RA3UYXIK6SE",
    },
  ],
} as const satisfies Track
