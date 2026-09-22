import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineJeansBoysJesusOffTheMarket = {
  id: "01a0c621-15c0-7ad5-9dd0-e5e1a6f44de8",
  type: "page-type/track",
  slug: "jenna-raine-jeans-boys-jesus-off-the-market",
  ownLength: 2.695683333333333,
  ownProgress: 2.695683333333333,
  partOfCollections: ["release/jenna-raine-jeans-boys-jesus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Off The Market",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "offthemarket|3aHe9rMa5HFTjXHw8tEz0A|161741",
  song: "song/jenna-raine-off-the-market",
  carriedBy: [
    {
      release: "release/jenna-raine-jeans-boys-jesus",
      discNumber: 1,
      position: 5,
      externalId: "7tr6pn8ZyErey14TDcvz7A",
      externalLink: "https://open.spotify.com/track/7tr6pn8ZyErey14TDcvz7A",
    },
  ],
} as const satisfies Track
