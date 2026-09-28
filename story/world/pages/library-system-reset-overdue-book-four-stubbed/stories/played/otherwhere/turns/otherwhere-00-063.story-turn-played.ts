import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00063 = {
  id: "01a0e80b-034b-77ae-bfea-82758341dbb8",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-063",
  ownLength: 154,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 63,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/writer",
  action: "**Good enough, where can I find some more books to shelve?**",
  beats: [
    "Nala asks Links where she can find more books to shelve.",
    'Links: "Where can\'t you? Pick a heap. Nearly three thousand of them left."',
    "She climbs the spiral staircase from the core chamber back up into the main hall.",
    "The nearest heap sprawls at the foot of the first carved column past the counter.",
    "She crouches, turns the first book to find its faint spine mark, and matches it to a low shelf.",
    "The second goes two shelves up; the third, a fat volume, to a shelf at her shoulder.",
    "As the third slides home, light runs up the Check-in Counter's carvings behind her.",
    "The carved trees glow gold, branch by branch, until every book-blossom and word-leaf is lit.",
    "On the desk's top, a hand-shaped patch of light brightens and waits.",
    "A window opens: Task Complete: Restore the Check-in Counter.",
    "Beneath it, a new line: Current Task: Reopen the Library. Serve a patron.",
  ],
  issues: [
    '"The nearest heap sprawls at the foot of the first carved column" - Nala was last in the core below',
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
