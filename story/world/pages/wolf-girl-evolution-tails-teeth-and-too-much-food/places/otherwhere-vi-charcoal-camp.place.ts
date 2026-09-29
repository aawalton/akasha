import type { Place } from "akasha/story/lore/place/place.page-type.types.ts"

export const otherwhereViCharcoalCamp = {
  id: "01a0eaca-ddd1-70f8-9243-05bab7d5fc92",
  type: "page-type/place",
  slug: "otherwhere-vi-charcoal-camp",
  title: "The Charcoal Camp",
  world: "world/wolf-girl-evolution-tails-teeth-and-too-much-food",
  within: "place/otherwhere-vi-greypine-weald",
  facts: [
    {
      fact: "The camp sits on flat gravel where the hollow stream runs into the Carrow.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Its clamp is a mound of pine boughs under turf and ash, smoking slowly and tended day and night.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The hut is poles and turf, with a stone hearth, a fire kept in, and two beds of fern and hides.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Jory Tull and old Wat are charcoal burners, at the clamp five more days, then rafting home.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jory is a steady, quiet man of thirty, slow to speak and quick to hand a stranger a bowl.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Wat is old, deaf in one ear, gruff, and will not have anyone go cold at his fire.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Burr is Wat's big shaggy hound; he barks at anything out of the woods, then wants to be petted.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "The burners have bread, bacon, dried fish, tea and a kettle, and eat plain but plenty.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "They keep a pot of pine-tip salve for burns and cuts, and a barrel of small beer.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Neither is a healer; the nearest is the herb-wife at Brackenford, half a day on downstream.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "Jory can leave the clamp for an hour at most, and only when Wat is there to watch it.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "A raft of charcoal poles lies beached at the camp, to carry the load down to Brackenford.",
      knowers: ["lore-disclosure/game-master"],
    },
    {
      fact: "The last hours of the way run open and sunlit; gravel bars lie in the sun from mid-morning.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Dry sedge and birch bark strip easily on that stretch; wrapped on, they end what bare feet cost.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "A heron fishes the shallows above the junction, and deer tracks cross the gravel every morning.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Burr leans his weight against Nala's legs, then lies with his chin over her foot.",
      knowers: ["lore-disclosure/game-master", "character-player/otherwhere-vi-nala"],
    },
    {
      fact: "Wat has the salve pot and the cloth brought for Nala's feet.",
      knowers: [
        "lore-disclosure/game-master",
        "character-player/otherwhere-vi-nala",
        "character-other/otherwhere-vi-jory-tull",
        "character-other/otherwhere-vi-wat",
      ],
    },
  ],
  exits: [
    {
      to: "place/otherwhere-vi-hollow-stream",
      way: "up the stream the way she came",
      direction: "north",
    },
    {
      to: "place/otherwhere-vi-brackenford",
      way: "down the Carrow by raft or bank, half a day",
      direction: "south",
    },
  ],
} as const satisfies Place
