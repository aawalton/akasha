import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsBonesBones = {
  id: "01a0c43f-da65-7a49-a700-ff7127cf9c0d",
  type: "page-type/track",
  slug: "imagine-dragons-bones-bones",
  ownLength: 2.7544,
  ownProgress: 2.7544,
  partOfCollections: ["release/imagine-dragons-bones", "release/imagine-dragons-mercury-acts-1-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "Bones",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "bones|53XhwfbYqKCa1cC15pYq2q|165264",
  song: "song/imagine-dragons-bones",
  carriedBy: [
    {
      release: "release/imagine-dragons-bones",
      discNumber: 1,
      position: 1,
      externalId: "0HqZX76SFLDz2aW8aiqi7G",
      externalLink: "https://open.spotify.com/track/0HqZX76SFLDz2aW8aiqi7G",
    },
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 2,
      position: 1,
      externalId: "54ipXppHLA8U4yqpOFTUhr",
      externalLink: "https://open.spotify.com/track/54ipXppHLA8U4yqpOFTUhr",
    },
  ],
} as const satisfies Track
