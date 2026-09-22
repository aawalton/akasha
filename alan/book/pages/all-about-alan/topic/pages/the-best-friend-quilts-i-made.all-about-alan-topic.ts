import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theBestFriendQuiltsIMade = {
  id: "01a0c9df-2e5d-7574-b8e7-2b9c9162fe3a",
  type: "page-type/all-about-alan-topic",
  slug: "the-best-friend-quilts-i-made",
  title: "The Best Friend Quilts I Made",
  definition: "the quilts I made two friends who were each other's best, and what hurt about it",
  parents: ["all-about-alan-topic/getting-back-to-making-with-my-hands"],
  related: [
    "all-about-alan-topic/the-friends-i-lost-track-of",
    "all-about-alan-topic/everyone-standing-at-the-same-distance",
  ],
  settled:
    "Quilting was never graded. Nobody held a standard over a quilt of mine that I could not read.\n\nThere is some pain there all the same. I made my two closest friends best friend quilts, each one featuring the other, because they were best friends with each other.\n\nThey were only friend level with me, and they were my best friends. The asymmetry hurt, so there is some associated pain.\n\nThat pain is a scar, and it came later rather than at the sewing. It attached when I left on my mission and we lost even the friend level of connection.\n\nAll of quilting took that scar rather than only the one quilt.",
} as const satisfies AllAboutAlanTopic
