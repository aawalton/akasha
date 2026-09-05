import type { StoryElementPlayed } from "../../story-element-played.page-type.ts"

export const coffeeShopDateCoffeeShop = {
  id: "01a0682a-d9b6-740b-aafd-f024df0bfe74",
  pageTypeSlug: "story-element-played",
  slug: "coffee-shop-date-coffee-shop",
  playedStorySlug: "coffee-shop-date",
  elementKind: "setting",
  perceiving:
    "The shop registers what is done to it and within it: the door opening, a chair scraping, a voice raised above the murmur, a cup set down, someone lingering at the counter. It does not read minds or motives — only the physical facts of bodies, objects, and sound moving through its space.",
  knowing:
    "A small third-wave café on a corner, the kind of place built for lingering: mismatched wooden tables, worn armchairs in the back, exposed brick, a chalkboard menu, the smell of espresso and steamed milk. Big front windows onto the street. Afternoons run quiet between rushes.\n\nAs the world element, it holds the *true* state of itself — which tables are free, how long the line is, what's about to run out, the song queued next — including the things no one has noticed yet. This is the ground truth the characters' beliefs are allowed to diverge from.",
  feeling:
    "Warm, hushed, faintly intimate — a low hum of conversation and milk being steamed, soft indie folk under it all. The kind of room that lowers voices and slows people down. On a rainy afternoon the warmth deepens, and the world outside the windows makes the inside feel like shelter.",
  wanting:
    "None, in the way a person wants. The shop only *tends*: drinks cool, the afternoon light moves across the floor, the room fills and empties on its own rhythm, the rain comes and goes. It enforces consequence; it pursues nothing. (Conation replaced by law — the setting's defining trait.)",
  doing:
    "It acts through ambience and incident: the hiss of the espresso machine, a barista calling a name, a song ending and another beginning, the bell over the door, rain against the glass, a table coming free in the back.\n\nMostly it reacts to what people do; sometimes it simply moves on its own — the light fades, the playlist turns, the afternoon tips toward evening.",
  turnStates: "jsonl",
} as const satisfies StoryElementPlayed
