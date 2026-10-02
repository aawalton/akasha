import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00098 = {
  id: "01a0ff08-6610-7452-a7d9-71a525968fb0",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-098",
  ownLength: 438,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 98,
  prose: "txt",
  characters: [
    "character-player/overwhere-i-nala",
    "character-other/overwhere-i-harl-voss",
    "character-other/overwhere-i-ghost-eye",
  ],
  stepStatus: "step-status/reviewers",
  action:
    "I sit and tell her about the wolves and the bandits, presenting the ears, the tags, and the heads as proof.",
  beats: [
    "Nala sets the cask down, lets the strength working go, and takes a stool at the counter.",
    '"Grete Holm," the grey woman says. "I run the Board. Whose head?"',
    "Nala tells her: the Greyfen Drakewolves and their alpha, then Harl Voss's crew on the east road.",
    "Grete's eyes go still on her a moment, the way a looking-skill settles, and her brows draw down.",
    "Nala lays out the proof: the cask, Voss's head from the salt, eight right ears and nine tin tags.",
    "At Voss's face the two hunters by the hearth stop dicing, and the hall goes quiet.",
    "Grete runs each tag against a ledger of levy names, nodding at every one.",
    "She lifts the lid on Ghost-Eye and grunts at the scarred crest and the empty left socket.",
    "Then she looks back at Nala, slow and careful, her scarred hands flat on the counter.",
    '"Your level says ten. Harl Voss was twenty-four. Who else was in it with you?"',
  ],
  lore: ["lore/overwhere-i-nala", "lore/overwhere-i-nala-2", "place/overwhere-i-wendlow"],
  endsAt: "2026-10-05T12:17:00.000Z",
} as const satisfies StoryTurnPlayed
