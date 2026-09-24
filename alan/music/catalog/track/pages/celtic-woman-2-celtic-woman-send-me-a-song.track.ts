import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2CelticWomanSendMeASong = {
  id: "01a0abea-78e4-769f-8b09-f813a16bc68c",
  type: "page-type/track",
  slug: "celtic-woman-2-celtic-woman-send-me-a-song",
  ownLength: 4.34135,
  ownProgress: 4.34135,
  partOfCollections: ["release/celtic-woman-2-celtic-woman"],
  status: "completed",
  unit: "unit/minutes",
  title: "Send Me A Song",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "sendmeasong|6NWtt9pNOL2Gx7kBykdE5x|260481",
  song: "song/celtic-woman-send-me-a-song",
  carriedBy: [
    {
      release: "release/celtic-woman-2-celtic-woman",
      discNumber: 1,
      position: 7,
      externalId: "10UOzrWGHnyVPb3cHRoZrQ",
      externalLink: "https://open.spotify.com/track/10UOzrWGHnyVPb3cHRoZrQ",
    },
  ],
} as const satisfies Track
