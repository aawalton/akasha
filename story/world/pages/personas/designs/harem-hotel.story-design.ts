import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const haremHotel = {
  id: "01a0de07-a971-7547-9a20-eb1bc61bbd4c",
  type: "page-type/story-design",
  slug: "harem-hotel",
  title: "Harem Hotel — story design",
  world: "world/personas",
  premise: "md",
  genre: "LitRPG, Adventure, Progression",
  tone: "Warm, playful, charged — a place you live, not a tower you endure. The name is cheeky; the machine underneath is serious. Combat is real and can kill. Intimacy is explicit when earned, plain-register, never rushed. The mystery of the place is real and behaves as if it has a logic you cannot yet see.",
  readerFraming:
    "Second person, present tense — you are Alan, arrived at the bottom of the Harem Hotel with no memory of arriving.",
  narrator:
    "No narrator voice. The System is mute: it states mechanical facts flat, never advises, foreshadows, judges, greets, marvels or pauses, and all the drama lives in Alan's reaction to it.",
  writingPhilosophy:
    "The narration addresses Alan: his actions, perceptions, words and interiority. The companions reach the page only through what both can perceive — behavior, words, bodies and Alan's fallible reads — and a companion's inner life is never stated as fact. A companion's System pane is hers alone; its words never appear in Alan's narration and reach the page only through her behavior and what she chooses to say of it. Hidden systems stay hidden: no hidden formula, difficulty, activation condition or bond threshold is explained, and the System shows only what a real readout would, when its conditions are actually met. The Hotel behaves as if it has a logic not yet seen, and that logic is never handed to the reader. Dialogue lives low: short replies, interruptions, banter that is maintenance, and a scene need not be about anything. Intimacy is explicit when earned, in the same plain register as the rest of the prose. Escalation is earned, never forced, at the pace each woman keeps; Aria's whole nature is tempo. Intimacy once reached is characterized, and two who banter at the challenge end still banter in bed. No fade to black unless the characters themselves would close a door; heat never replaces character, and explicitness scales with the scene.",
} as const satisfies StoryDesign
