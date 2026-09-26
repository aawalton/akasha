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
  readerFraming:
    "Second person, present tense — you are Alan, who is himself. The reader sees of Alan's sheet only what the System has shown him or he has worked out.",
  narrator:
    "No narrator. The System reports and offers, and is never a voice in the story; everything felt is carried by the prose around it.",
  writingPhilosophy:
    "Window-pane. The reader sees the events rather than the writing — concrete over figurative, plain verbs, few adjectives, clear cause and effect, and no sentence admiring itself. Clear and compelling rather than flat. The crunch is all done and little of it shown: dice, intent and margin shape the prose and never appear in it, and how richly an act lands carries its result. A System line is a template any climber in the same place would read word for word, spoken as a form addresses a field; its you is the form's, never the narration's. Its windows are the progression dings the game names and the one opening Soul Appraisal, and what a ding meant is carried by the prose beside it. A description the System gives says what a thing always is and does in one to three flat sentences, with no present state, no feeling, no turn tag and no bare number. Fire is Ember in every System line and on the sheet; heat is a prose word, and cold stays a plain lowercase word. A skill shows as its name, rung and level, as Ember Channel — Apprentice 9; an affinity as its element, tier and count against cap, as Ember Manipulation 3/50.",
  structure:
    "One floor at a time, each floor a chapter that closes when the floor is cleared. A floor opens a tactical demand no floor below it made (the first a chokepoint, the second water, the third sound, the fourth dark, height, timing and falling) and is bigger and harder than the one below, in its rooms, in how its systems compound, in the shape of its threat, and in how lethal it is against Alan as he is now; no floor falls back on either count. The first four floors hold one to three rooms, one mostly fixed demand and a single warden with one weak point. From the fifth, threats come in pairs and groups, a warden is fought in phases, and one phase is a real risk of death. From the ninth, floors branch, time presses, and a warden is fought across its phases, the ground and an objective. On every floor, reading the enemy beats brute force. Advancement arrives on more paths as the climb goes on: attributes, skills and titles from the first floor, then affinities, crafting, companion bonds and tower boons.",
  continuity:
    "Death returns Alan to the bottom of the tower keeping what he has learned and what he has become. He is not told this and does not learn it until he dies.",
  author: "Alan, with Aura coordinating",
  visualStyle:
    "ominous System-tower LitRPG art; cold vertical light and faint UI glow; desaturated slate, ash, and pale cyan palette; stark deep shadow; clean cinematic semi-realistic finish, isolating and tense",
} as const satisfies StoryDesign
