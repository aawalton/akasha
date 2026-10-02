import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const saltAndLamplightCast = {
  id: "01a0fd04-3360-71b1-b1bd-b3076d742def",
  type: "page-type/world-mechanic",
  slug: "salt-and-lamplight-cast",
  title: "Cast",
  world: "world/salt-and-lamplight",
  description:
    "Nala is Alan, woken in a woman's body: about twenty-five, petite, pale and freckled, with long dark red hair, her face as her character's `coverDescription` says. The woman she falls in love with keeps the lighthouse, and she is the story's one love interest: in her twenties, gorgeous, feminine and slim, never heavy, large-chested or older, with a past, wants and a reserve of her own. The world builder decides who she is before chapter 1. The rest of the cast are the people of the harbour town, invented by the world builder, never personas; every one is an adult, and no man is ever a love interest. Each named character has a character-other at `story/world/pages/salt-and-lamplight/stories/written/salt-and-lamplight/characters/salt-and-lamplight-<name>.character-other.ts`, with `story: \"story-written/salt-and-lamplight\"` and `title` her name, and a lore page at `story/world/pages/salt-and-lamplight/lore/salt-and-lamplight-<name>.lore.ts` in `world/salt-and-lamplight` holding her look, her nature and her past as facts. Nala's own lore, `salt-and-lamplight-nala.lore.ts` there, holds what she remembers of being Alan and what her body is, and the world builder lands it before chapter 1. The world builder lands each other character's page and lore before the chapter she first appears in, with a portrait as her `cover`: render her alone, head to thigh, in the story design's visual style, as her lore's look describes her, as the picture recorder renders a turn but 832 wide and 1216 tall. The renderer draws women busty, so the prompt states her slim build and small chest, and the world builder renders again until it matches before setting `cover`. The memory story recorder tells each character each fact the prose shows her.",
} as const satisfies WorldMechanic
