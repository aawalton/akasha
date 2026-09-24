import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChristmasAwayInAManger = {
  id: "01a0b4c8-3526-7e87-8f57-1afd011aedc7",
  type: "page-type/track",
  slug: "paul-cardall-christmas-away-in-a-manger",
  ownLength: 4.394933333333333,
  ownProgress: 4.394933333333333,
  partOfCollections: ["release/paul-cardall-christmas", "release/paul-cardall-christmas-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "Away in a Manger",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "awayinamanger|7FQRbf8gbKw8KZQZAJWxH2|263696",
  song: "song/celtic-woman-away-in-a-manger",
  carriedBy: [
    {
      release: "release/paul-cardall-christmas",
      discNumber: 1,
      position: 12,
      externalId: "3Cw9vV3b8G6ftnoD23SpwN",
      externalLink: "https://open.spotify.com/track/3Cw9vV3b8G6ftnoD23SpwN",
    },
    {
      release: "release/paul-cardall-christmas-hymns",
      discNumber: 1,
      position: 5,
      externalId: "0t33iTv2bHVcYUeLmZ08uQ",
      externalLink: "https://open.spotify.com/track/0t33iTv2bHVcYUeLmZ08uQ",
    },
  ],
} as const satisfies Track
