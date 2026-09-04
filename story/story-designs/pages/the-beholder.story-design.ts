import type { StoryDesign } from "../story-design.page-type.ts"

export const theBeholder = {
  id: "01a0657d-bb8d-761c-af48-1d61b81985b6",
  pageTypeSlug: "story-design",
  slug: "the-beholder",
  title: "The Beholder — story design",
  worldSlug: "the-beholder",
  premise:
    "An interactive superhero/supervillain anti-hero LitRPG. Powers (\"the Onset\")\nbegan surfacing across the world a few years ago — ordinary people waking up\nchanged, the System overlaying everyone with stats, skills, and levels. The\nprotagonist is a young woman whose power is **Acquisition**: when she kills,\nshe permanently steals **10% of one** of the victim's attributes, **or one**\nof their abilities (at reduced strength) — a single deliberate theft per kill.\nHer obsession is **beauty** — not vanity alone but a consuming aesthetic\nhunger, a belief that she can carve herself toward something perfect, one\ndeath at a time. The story is her descent (or ascent) from a nobody into\nsomething gorgeous and monstrous, with the reader choosing what she takes and\nwhat she becomes at each threshold.\n\n\n**The core loop.** Each chapter builds to a kill (one victim or several). At\nthe chapter's end the reader is offered a menu drawn from the **three most\nnotable attributes or powers** of that chapter's victim(s), and chooses which\none she carves off and keeps. This steal-choice is the recurring decision that\ndrives every chapter.",
  genre: "LitRPG, Superhero, Anti-Hero, Dark, Progression",
  tone: "Morally grey and intense; sensual but dark; a character study of\nobsession wrapped in an escalating power fantasy with real cost. Visceral\nwithout being gratuitous; seductive prose for a seductive descent. PROTAGONIST\nVOICE (anchor): she is cheerful, bubbly, and energetic — bright and upbeat in\nnarration and dialogue — in deliberate contrast to her total lack of care for\nothers and her explicit, casual brutality. The horror comes from the gap: she\nkills and mutilates with the sunny enthusiasm of a girl picking out an outfit.\nNever brooding or angsty; her darkness is gleeful, not tormented.",
  themes:
    "Beauty and its price; self-improvement through harm; addiction and\nescalation; the ethics of becoming; identity and the self you assemble from\nothers; what the line between hero and monster actually is; control vs.\ncompulsion.",
  readerFraming:
    "You read the story, but at each build threshold — what trait to\nsteal, what ability to keep, how to shape herself — the choice is yours. You\ndecide what she becomes.",
  system: "interactive (system type defined at Game Setup)",
} as const satisfies StoryDesign
