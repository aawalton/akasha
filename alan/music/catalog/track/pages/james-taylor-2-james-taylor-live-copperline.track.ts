import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2JamesTaylorLiveCopperline = {
  id: "01a0abeb-3e5b-76b2-ad9c-cb671499543a",
  type: "page-type/track",
  slug: "james-taylor-2-james-taylor-live-copperline",
  ownLength: 4.654433333333333,
  ownProgress: 4.654433333333333,
  partOfCollections: ["release/james-taylor-2-james-taylor-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "Copperline",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/james-taylor" }],
  trackKey: "copperline|0vn7UBvSQECKJm2817Yf1P|279266",
  song: "song/james-taylor-copperline",
  carriedBy: [
    {
      release: "release/james-taylor-2-james-taylor-live",
      discNumber: 2,
      position: 8,
      externalId: "3GuCDFyTO1FDhWgbhCkg0A",
      externalLink: "https://open.spotify.com/track/3GuCDFyTO1FDhWgbhCkg0A",
    },
  ],
} as const satisfies Track
