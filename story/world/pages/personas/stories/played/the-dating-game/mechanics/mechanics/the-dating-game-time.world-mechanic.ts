import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const theDatingGameTime = {
  id: "01a0e3ab-3de9-7f5b-a12f-481137822267",
  type: "page-type/world-mechanic",
  slug: "the-dating-game-time",
  title: "Time",
  description:
    "The Dating Game keeps an in-game clock. Every played turn states `endsAt`, the in-game date and clock time the turn ends at, written as a UTC instant whose date and time are the story's own wall clock in Provo: 2:30 PM on October 3, 2026 is `2026-10-03T14:30:00.000Z`. The story opens at 8:00 AM on Saturday, September 26, 2026, as Alan wakes. A turn's end time is the end time of the turn before, or the opening for the first turn, plus the time the turn's prose shows passing, judged plainly from what happens: a greeting or a line of talk takes a minute, a walk takes what the distance takes on foot, a hike takes what the trail takes, a meal takes a meal, and a night's sleep runs to the morning. Where the prose names an hour, a meal or the light, the end time agrees with it. Time never runs backward, so no turn ends before the turn before it. Before each turn, the game master and the writer read the end time of the latest turn at player, so a reference like \"this evening\", \"tomorrow\" or \"next Saturday\" lands on a real day and hour, and a shop, class or shift the lore sets at an hour is open or shut as the clock says. The mechanics story recorder, never the game master, records each turn's end time on the turn's own page once its prose is written. The time is no secret and no closeness level, so a character may say it and the prose may show it.",
} as const satisfies WorldMechanic
