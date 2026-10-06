import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const encountersCast = {
  id: "01a112ff-0b08-7ed7-811b-a1b333c97a7e",
  type: "page-type/world-mechanic",
  slug: "encounters-cast",
  title: "Cast",
  world: "world/encounters",
  description:
    "Each chapter of Encounters is one standalone encounter between Alan and the girl or girls its premise names: new characters, never personas, and every one an adult. Who she is, how she looks, where they are and how it starts come from the premise Alan gives for that chapter, and the world builder fills in only what the premise leaves open. A girl appears in her own chapter alone unless Alan asks for her again, and then she remembers him. Each girl has a character-other at `story/world/pages/encounters/stories/written/encounters/characters/encounters-<her name>.character-other.ts`, with `story: \"story-written/encounters\"` and `title` her name from the start, and a lore page about her at `story/world/pages/encounters/lore/encounters-<her name>.lore.ts` in `world/encounters`. Her lore holds her look and her nature as facts, and one fact for each chapter she appears in, as `Chapter <n>: <how the encounter began>`. The world builder lands a new girl's character and lore before the chapter she first appears in, with a portrait as her character's `cover`: render her alone, head to thigh, in the story design's visual style, as her lore's look describes her, rendered as the picture recorder renders a turn but 832 wide and 1216 tall. The world builder looks at the render and renders again until it matches her look before setting `cover`; the memory story recorder tells Alan's character each fact the prose shows him, and adds the chapter fact for each girl in the chapter.",
} as const satisfies WorldMechanic
