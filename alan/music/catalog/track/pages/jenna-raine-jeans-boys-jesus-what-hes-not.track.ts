import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jennaRaineJeansBoysJesusWhatHesNot = {
  id: "01a0c621-16be-76f0-afba-d26e293fa156",
  type: "page-type/track",
  slug: "jenna-raine-jeans-boys-jesus-what-hes-not",
  ownLength: 3.174533333333333,
  ownProgress: 3.174533333333333,
  partOfCollections: ["release/jenna-raine-jeans-boys-jesus"],
  status: "completed",
  unit: "unit/minutes",
  title: "What He's Not",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3aHe9rMa5HFTjXHw8tEz0A", artistName: "Jenna Raine" }],
  trackKey: "whathesnot|3aHe9rMa5HFTjXHw8tEz0A|190472",
  song: "song/jenna-raine-what-hes-not",
  carriedBy: [
    {
      release: "release/jenna-raine-jeans-boys-jesus",
      discNumber: 1,
      position: 9,
      externalId: "6qvYH2TiyjUSxRe43HGf8l",
      externalLink: "https://open.spotify.com/track/6qvYH2TiyjUSxRe43HGf8l",
    },
  ],
} as const satisfies Track
