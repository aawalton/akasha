import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersHome = {
  id: "01a0afa2-169b-7d02-a1f1-d68fcff03753",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-home",
  ownLength: 4.626,
  ownProgress: 4.626,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  title: "Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "home|0jW6R8CVyVohuUJVcuweDI|277560",
  song: "song/the-piano-guys-home",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 9,
      externalId: "1mdUTN1RtD2oOUIusIhium",
      externalLink: "https://open.spotify.com/track/1mdUTN1RtD2oOUIusIhium",
    },
  ],
} as const satisfies Track
