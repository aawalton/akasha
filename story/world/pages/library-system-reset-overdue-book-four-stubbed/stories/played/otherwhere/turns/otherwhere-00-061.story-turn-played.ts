import type { StoryTurnPlayed } from "akasha/story/world/stories/played/turns/story-turn-played.page-type.types.ts"

export const otherwhere00061 = {
  id: "01a0e7fe-9523-7ffc-8df5-56b9ae1779fe",
  type: "page-type/story-turn-played",
  slug: "otherwhere-00-061",
  unit: "unit/words",
  partOfCollections: ["story-played/otherwhere"],
  position: 61,
  turnStatus: "turn-status/writer",
  action:
    "**Okay Links, what do I need to do the restore the check-in counter? Also, are there any global taboos I need to know about? From seeing the past patrons, I'm assuming the cultures here are more diverse than what I'm use to.**",
  beats: [
    "Nala asks Links what restoring the counter takes, and whether there are taboos she should know.",
    'Links: "Three more points. Three books on their shelves, and the counter\'s yours."',
    'Links: "The big taboo: Library ground is neutral. Nobody harms anybody here, whatever their feuds."',
    "Links: \"Spill a patron's blood, or a worker's, here, and my security golems kill you. No appeal.\"",
    "Links: \"Don't touch a patron without leave. To many peoples it's an insult. To some, an attack.\"",
    'Links: "Some keep their true names to themselves and give you one for use. Take it. Don\'t dig."',
    "Links: \"Ask who someone is, never what. 'What are you' starts fights.\"",
    "Links: \"And anyone who comes in need, we feed and shelter. That's not a kindness. It's the rule.\"",
    "Links: \"The translator's in your link, so you'll follow them all. It chokes on idioms. Talk plain.\"",
  ],
  lore: ["lore/otherwhere-universe"],
} as const satisfies StoryTurnPlayed
