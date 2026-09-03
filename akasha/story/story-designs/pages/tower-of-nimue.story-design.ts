import type { StoryDesign } from "../story-design.page-type.ts"

export const towerOfNimue = {
  id: "01a0657d-bb8e-77a8-bafb-000d2b166210",
  pageTypeSlug: "story-design",
  slug: "tower-of-nimue",
  title: "The Tower of Nimue — story design",
  worldSlug: "tower-of-nimue",
  premise:
    "When the System descended, most of humanity died in the first hour. Nimue woke to a glowing prompt and a floor of corpses — and a Tower that had unfolded out of the sky where her city used to be. The System's terms are simple and merciless: climb, or be erased with the rest of the unascended. Each floor is a trial; each trial pays in levels, skills, and the right to keep breathing. She climbs alone. No party, no guild, no second chances — just one woman, an interface only she can see, and a hundred floors of things that want her dead.",
  genre: "LitRPG, System Apocalypse, Progression Fantasy, Dungeon Crawl",
  tone: "Tense, propulsive, survival-grounded; solo isolation; the System as an indifferent scorer; grit over grimdark. PROSE REGISTER (house style, per Alan — overrides any default ornate register): WINDOWPANE. Language you look through at the story, not at. Nimue's internal natural narrative voice — a trauma nurse's mind: practical, concrete, clipped, dry, unsentimental. More spoken than written: contractions, short sentences, plain words over fancy ones, concrete nouns and verbs. Cut ornate similes, stacked subordinate clauses, and future-narrator flourishes ('a hundred floors later she would…'). Unshowy, not flat — still tense and felt; the feeling comes from what happens and what she notices, not from elevated phrasing. POINT OF VIEW (per Alan): FIRST PERSON, PAST TENSE — Nimue narrating her own climb ('I set the foot of the pole down on the dead pavement'). No retrospective 'I would later…' creep. SYSTEM VOICE (house style, per Alan): the in-world System is impersonal, universal infrastructure Nimue is SUBJECTED to — NOT a narrator and NOT a character. Stat/menu/notification screens are System UI and address her as 'you' the way a FORM addresses 'you' (a field), never as a character speaking to her. COPY-PASTE TEST: every System line must be a templated string that could appear verbatim for ANY climber in that exact mechanical situation, with no knowledge of who is reading it. The System REPORTS state and OFFERS options; it never advises, foreshadows, judges, or flatters. Banned leaks: taking a stance ('I do not advise. I only record what you make of the dead'), foreshadowing dread ('the first you will carry that was never human'), flattering her specialness ('seen by your eye alone'), narrating her specific scene ('You are bleeding heat. It can taste where you are'), tactical coaching poetry ('the soft is only soft on the inhale'). ALLOWED: flat, universal game flavor — bestiary/weak-point entries, essence/item descriptions, threshold notifications — identical for everyone, opinion-free. Flavor is fine; personality is not. All meaning-making lives in Nimue's narration, never in the System.",
  themes:
    "Isolation and self-reliance; the cost of power; adaptation under deadly pressure; who you become when no one is watching.",
  readerFraming:
    "Interactive playthrough. The reader IS Nimue at every System decision point — class, skill, perk, and stat choices are the reader's to make, and the prose bends to the choice. Between decisions the reader simply reads Nimue's climb.",
  system: "System Apocalypse",
} as const satisfies StoryDesign
