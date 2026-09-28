import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00056 = {
  id: "01a0e7d2-0b85-752e-9c29-a57344162086",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-056",
  ownLength: 141,
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 56,
  prose: "txt",
  characters: ["character-player/otherwhere-alan", "character-other/otherwhere-links"],
  turnStatus: "turn-status/recorders",
  action:
    "**Fine, I’ll focus on shelving, could you at least let me know if I shelve that book or another that would make this faster? Otherwise I’ll focus on getting books on the right shelves.** I start in on the books, one section of the floor at a time. First, I pull the books all together in loose stacks, then do a rough sort by the marks on the spines, then carry matching piles to the right shelves, then on to the next section of floor, working quickly and efficiently. I’ve sorted books onto shelves many times before for my own home library of several thousands books, so the process is familiar.",
  beats: [
    "Nala says she'll shelve, but asks Links to say if she touches that book, or one like it.",
    "Links: \"Your hand lands on one, I'll know that instant. I'll tell you. Loudly.\"",
    "She starts on the heaps just beside the counter and drags the scattered books into loose stacks.",
    "It's the rhythm of her home library back on Earth, thousands of books sorted many times before.",
    "She squints at each cracked spine's faint mark and begins splitting the stacks into rough piles.",
    "Partway through, she picks up a slim, plain-bound book, and Links's voice cuts in.",
    'Links: "That one! That\'s Shelf Sight."',
    'Links: "Read it, and one glance at any spine tells you where it goes. No more squinting at marks."',
  ],
  issues: [
    '"carry each pile to its shelf" - no beat has her carry piles to shelves; beats end at sorting',
  ],
  lore: ["lore/otherwhere-universe", "place/otherwhere-main-hall"],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
} as const satisfies StoryTurnPlayed
