import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasWeThreeKings = {
  id: "01a0afa2-17f5-70b2-a221-9c643bdef766",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-we-three-kings",
  ownLength: 3.2588166666666667,
  ownProgress: 3.2588166666666667,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  status: "completed",
  unit: "unit/minutes",
  title: "We Three Kings",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Traditional" }, { artist: "artist/the-piano-guys" }],
  trackKey: "wethreekings|0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf|195529",
  song: "song/the-piano-guys-we-three-kings",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-a-family-christmas",
      discNumber: 1,
      position: 8,
      externalId: "4xwQXoPQP2RJ6j98vgJgVV",
      externalLink: "https://open.spotify.com/track/4xwQXoPQP2RJ6j98vgJgVV",
    },
  ],
} as const satisfies Track
