import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineJeansBoysJesusGodMadeHim = {
  id: "01a0c621-17d8-77d1-a74d-8dc83ba5358d",
  type: "page-type/track",
  slug: "jenna-raine-jeans-boys-jesus-god-made-him",
  ownLength: 3.71375,
  ownProgress: 0,
  partOfCollections: ["release/jenna-raine-jeans-boys-jesus", "release/jenna-raine-god-made-him"],
  status: "not-started",
  unit: "unit/minutes",
  title: "God Made Him",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "godmadehim|3aHe9rMa5HFTjXHw8tEz0A|222825",
  song: "song/jenna-raine-god-made-him",
  carriedBy: [
    {
      release: "release/jenna-raine-god-made-him",
      discNumber: 1,
      position: 1,
      externalId: "4GkoWb00TaR4QPQB7eoS2X",
      externalLink: "https://open.spotify.com/track/4GkoWb00TaR4QPQB7eoS2X",
    },
    {
      release: "release/jenna-raine-jeans-boys-jesus",
      discNumber: 1,
      position: 10,
      externalId: "1b78hB2DTRVmyTo6n6XmhT",
      externalLink: "https://open.spotify.com/track/1b78hB2DTRVmyTo6n6XmhT",
    },
  ],
} as const satisfies Track
