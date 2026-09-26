import type { StoryDesign } from "akasha/story/world/designs/story-design.page-type.types.ts"

export const theBeholder = {
  id: "01a0657d-bb8d-761c-af48-1d61b81985b6",
  type: "page-type/story-design",
  slug: "the-beholder",
  title: "The Beholder — story design",
  world: "world/the-beholder",
  premise: "md",
  genre: "LitRPG, Superhero, Anti-Hero, Dark, Progression",
  tone: "Morally grey and intense; sensual but dark; a character study of\nobsession wrapped in an escalating power fantasy with real cost. Visceral\nwithout being gratuitous; seductive prose for a seductive descent. PROTAGONIST\nVOICE (anchor): she is cheerful, bubbly, and energetic — bright and upbeat in\nnarration and dialogue — in deliberate contrast to her total lack of care for\nothers and her explicit, casual brutality. The horror comes from the gap: she\nkills and mutilates with the sunny enthusiasm of a girl picking out an outfit.\nNever brooding or angsty; her darkness is gleeful, not tormented.",
  themes:
    "Beauty and its price; self-improvement through harm; addiction and\nescalation; the ethics of becoming; identity and the self you assemble from\nothers; what the line between hero and monster actually is; control vs.\ncompulsion.",
  readerFraming:
    "You read the story, but at each build threshold — what trait to\nsteal, what ability to keep, how to shape herself — the choice is yours. You\ndecide what she becomes.",
  system: "interactive (system type defined at Game Setup)",
  structure:
    "Theft is flat-additive, so a focused stat climbs linearly within a tier, and the slope steps up each tier as Pearl eats bigger prey and stacks duplicate powers, which Will multiplies. Keep Pearl focused on about two stats: spread leaves everything in the low teens, too soft to ambush by chapter 12, while focus banks a combat stat into the low-to-mid 20s by about chapter 12. Chapters 1 to 12 are the banking phase on unpowered humans, attribute-only, until she is ambush-grade against a Freshly-Awakened cape. The first power, around chapters 13 to 15, is where the dam breaks. Milestones: superhuman among capes by about chapter 20, dominant by about 35, untouchable by about 60. The dial is the steal rate: 10% is canon, and 12 to 15% later would pull the beats earlier. Larger forks come as they are reached: Titles, Tier Ascensions as transformation beats at tier crossings, Power Evolution and Fusion, Acquisition Evolutions (two steals a kill, a sharper rate, at range, without a kill), and The Naming.",
  writingPhilosophy:
    "Pearl ambushes through intimacy and opportunism and never duels; a fight reads up through casting, powers and tactics rather than raw stats. The System's readout is mechanical and indifferent: no personality, preference, emphasis, pet names, sparkle or asides, no level line, no skill line, no emoji, and one decimal everywhere. Pearl's taste, glee and 'this one is beautiful' live only in her narration around the screen, never inside the System block. Each steal records the victim's source stats, as chapter 1 records Colette Vane's. The appraisal screen is:\nACQUISITION — APPRAISAL\nSUBJECT: <Name> — UNPOWERED            (or: — AWAKENED)\nPEARL  Might 8.0 · Vitality 9.0 · Celerity 11.0 · Acuity 12.0 · Will 10.0 · Allure 15.6\n  1  <ATTRIBUTE>   subject <V.V>   you <X.X> -> <Y.Y>   <neutral governs clause>\n  2  <ATTRIBUTE>   subject <V.V>   you <X.X> -> <Y.Y>   <neutral governs clause>\n  3  <ATTRIBUTE>   subject <V.V>   you <X.X> -> <Y.Y>   <neutral governs clause>\nSELECT ONE. ONE ONLY.\nA power in the top three takes the line:\n  n  POWER: <Name>   subject mastery <M.M>   you gain 10% -> <0.1*M>   Onset ability; Will multiplies output",
} as const satisfies StoryDesign
