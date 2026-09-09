import type { StoryDesign } from "../story-design.page-type.ts"

export const theBeholder = {
  id: "01a0657d-bb8d-761c-af48-1d61b81985b6",
  pageTypeSlug: "story-design",
  slug: "the-beholder",
  title: "The Beholder — story design",
  world: "the-beholder",
  premise: "md",
  genre: "LitRPG, Superhero, Anti-Hero, Dark, Progression",
  tone: "Morally grey and intense; sensual but dark; a character study of\nobsession wrapped in an escalating power fantasy with real cost. Visceral\nwithout being gratuitous; seductive prose for a seductive descent. PROTAGONIST\nVOICE (anchor): she is cheerful, bubbly, and energetic — bright and upbeat in\nnarration and dialogue — in deliberate contrast to her total lack of care for\nothers and her explicit, casual brutality. The horror comes from the gap: she\nkills and mutilates with the sunny enthusiasm of a girl picking out an outfit.\nNever brooding or angsty; her darkness is gleeful, not tormented.",
  themes:
    "Beauty and its price; self-improvement through harm; addiction and\nescalation; the ethics of becoming; identity and the self you assemble from\nothers; what the line between hero and monster actually is; control vs.\ncompulsion.",
  readerFraming:
    "You read the story, but at each build threshold — what trait to\nsteal, what ability to keep, how to shape herself — the choice is yours. You\ndecide what she becomes.",
  system: "interactive (system type defined at Game Setup)",
} as const satisfies StoryDesign
