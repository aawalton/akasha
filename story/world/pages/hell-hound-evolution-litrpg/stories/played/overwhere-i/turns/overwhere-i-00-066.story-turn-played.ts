import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const overwhereI00066 = {
  id: "01a0fd18-f41b-7fc8-b3dd-f4e716627a82",
  type: "page-type/story-turn-played",
  slug: "overwhere-i-00-066",
  ownLength: 148,
  unit: "unit/words",
  partOfCollections: ["story-played/overwhere-i"],
  position: 66,
  prose: "txt",
  characters: ["character-player/overwhere-i-nala", "character-other/overwhere-i-ghost-eye"],
  stepStatus: "step-status/recorders",
  action:
    "“How far to Wendlow again? I’d love to get this turned in and paid for before it stinks too much.”",
  beats: [
    "Nala asks how far Wendlow is again; she'd like the head turned in and paid before it stinks.",
    "Hessa answers: three days east on the east road by cart or on foot, two on a good horse.",
    "Tobin takes Nala's question as a yes and grins from ear to ear.",
    "Hessa cuts in: the boy goes only if Nala says so plainly.",
    "Garrick offers his salt, four copper a sack, and a hand packing the head in the Stag's back room.",
    "Packing it, he reckons, is about an hour's work tonight.",
    "Osric sweeps off his hat: he leaves for Wendlow at dawn tomorrow, by cart.",
    '"Ride as my guard," he says, "and you and your head go free."',
  ],
  lore: [
    "lore/overwhere-i-fenwatch-2",
    "lore/overwhere-i-garrick-pell",
    "lore/overwhere-i-hessa-vane",
    "lore/overwhere-i-nala",
    "lore/overwhere-i-nala-2",
    "lore/overwhere-i-osric-fenn",
    "lore/overwhere-i-tobin-ashdown",
    "place/overwhere-i-greyback-and-east-road",
  ],
  reviewedBy: ["story-reviewer/style", "story-reviewer/continuity"],
  recordedBy: ["story-recorder/inventory"],
  endsAt: "2026-10-02T17:05:00.000Z",
} as const satisfies StoryTurnPlayed
