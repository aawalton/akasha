import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const gracieAbramsTheSecretOfUsDeluxeUsFeatTaylorSwift = {
  id: "01a13fd8-9f23-7144-ad38-1bb0eca08ad5",
  type: "page-type/track",
  slug: "gracie-abrams-the-secret-of-us-deluxe-us-feat-taylor-swift",
  ownLength: 4.044433333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/gracie-abrams-the-secret-of-us-deluxe",
    "release/gracie-abrams-the-secret-of-us",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "us. (feat. Taylor Swift)",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/gracie-abrams" }, { artist: "artist/taylor-swift" }],
  trackKey: "usfeattaylorswift|06HL4z0CvFAxyc27GXpf02,4tuJ0bMpJh08umKkEXKUI5|242666",
  song: "song/gracie-abrams-us",
  carriedBy: [
    {
      release: "release/gracie-abrams-the-secret-of-us",
      discNumber: 1,
      position: 5,
      externalId: "0hhzNPE68LWLfgZwdpxVdR",
      externalLink: "https://open.spotify.com/track/0hhzNPE68LWLfgZwdpxVdR",
    },
    {
      release: "release/gracie-abrams-the-secret-of-us-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "5WcsxoURbNjQPQvzKpHUMn",
      externalLink: "https://open.spotify.com/track/5WcsxoURbNjQPQvzKpHUMn",
    },
  ],
  createdAt: "2026-10-15T13:55:23.541Z",
  updatedAt: "2026-10-15T13:55:23.541Z",
} as const satisfies Track
