import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00050 = {
  id: "01a0f42c-cae4-7f18-b1ce-9207300ff6d7",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-050",
  ownLength: 169,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 50,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-ghost-eye",
    "character-other/overwhere-i-pine-isle-drakewolf-six",
    "character-other/overwhere-i-pine-isle-drakewolf-seven",
    "character-other/overwhere-i-pine-isle-drakewolf-eight",
  ],
  stepStatus: "step-status/reviewers",
  action:
    "I launch a bullet at Ghost Eye from where I am, as accurate as I can make it, but with as much power as I can give it, to see if he will approach or retreat.",
  beats: [
    "Nala draws a slug from her pack and rises to one knee behind the last hummock.",
    "She weaves air and earth, then pours a second weave into the same slug, doubling its charge.",
    "The weight of it drags hard on her mana; she sights on the big wolf on the shore.",
    "About two hundred and ten yards; she lifts her aim for the drop and looses.",
    "The slug cracks away spinning, and she knows at once the arc is off.",
    "It falls spent and short, and slaps into the channel a few yards from the shore.",
    "Ghost-Eye's head snaps round to the splash, then to her, its crest rising.",
    "It plants its forefeet at the water's edge and snarls across the marsh at her.",
    "The three wolves with it close up at its sides, snarling too, and hold the shore.",
    "Behind them, the last of the pups vanishes west among the pines.",
  ],
  issues: ['"doubling its charge" - a second Weave cast gives half again the force, not double'],
  lore: [
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-starfall-legacy",
    "lore/overwhere-i-the-greyfen-alpha-2",
  ],
  reviewedBy: ["story-reviewer/continuity"],
  endsAt: "2026-10-01T13:31:00.000Z",
} as const satisfies StoryTurnPlayed
