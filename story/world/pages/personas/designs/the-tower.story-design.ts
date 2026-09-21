import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const theTower = {
  id: "01a0657d-bb8e-764d-a24a-103a24ed8e84",
  type: "page-type/story-design",
  slug: "the-tower",
  title: "The Tower — story design",
  world: "world/personas",
  premise: "md",
  genre: "LitRPG, Progression fantasy, Romance",
  tone: "Cold, exact and lonely, warming only where a companion earns it. Consequence over comfort; every outcome falls out of the numbers rather than out of what the scene wants.",
  themes:
    "A mind against a body it cannot trade in; being read by something that owes you no explanation; what is kept when everything else is taken back.",
  readerFraming: "Second person, present tense — you are Alan, who is himself.",
  narrator:
    "No narrator. The System reports and offers, and is never a voice in the story; everything felt is carried by the prose around it.",
  writingPhilosophy:
    "Window-pane. The reader sees the events rather than the writing — concrete over figurative, plain verbs, few adjectives, clear cause and effect, and no sentence admiring itself. Clear and compelling rather than flat.",
  structure:
    "One floor at a time, each floor a chapter that closes when the floor is cleared. A floor opens a tactical demand the last floor did not, and steps up in size and difficulty as well. Advancement arrives on more paths as the climb goes on: attributes, skills and titles from the first floor, then affinities, crafting, companion bonds and tower boons.",
  continuity:
    "Death returns Alan to the bottom of the tower keeping what he has learned and what he has become. He is not told this and does not learn it until he dies.",
  author: "Alan, with Aura coordinating",
  visualStyle:
    "ominous System-tower LitRPG art; cold vertical light and faint UI glow; desaturated slate, ash, and pale cyan palette; stark deep shadow; clean cinematic semi-realistic finish, isolating and tense",
} as const satisfies StoryDesign
