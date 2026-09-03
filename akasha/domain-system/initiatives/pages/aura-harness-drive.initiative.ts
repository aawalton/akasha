import type { Initiative } from "../initiative.page-type.ts"

export const auraHarnessDrive = {
  id: "01a0675d-9d5f-79ba-aefb-404d5c9502eb",
  pageTypeSlug: "initiative",
  slug: "aura-harness-drive",
  domainSlug: "domain/game-design",
  personaSlug: "aura",
  intents: [
    {
      statement: "Alan's harness drives the behavior he wants to drive.",
      workingMemory:
        "Chou's eight drives are pages under game-design, each carrying his number, name and definition beside ours. The harness is a memory prosthetic and an executive function support before it is a game, and its win condition is going quiet so Alan leaves. Warm colours and black mean a goal unmet; green and blue are both wins. Recovery is a chain of integrals, stress level to surplus to safety to life satisfaction, each on a longer cadence than the last.",
    },
    { statement: "Alan's daily upkeep habits read as six attribute stoplights." },
    {
      statement: "Both stoplight sets draw as widgets in Alan's native app.",
      workingMemory:
        "The attribute widget, its feed and /api/attribute-stoplights are on origin at a4030b89 and the web is deployed there. Two fixes are local only: c58ab88f4a names the widget in the bundle Alan's extension starts at, and be9f943a1e severs the client graph's reach to page-value so the no-node-in-client gate clears. The MacBook builds from origin, and a push is refused by the migration's sixteenth constraint since cb985795c0, so the build waits for the migration's end.",
    },
    { statement: "Every attribute's daily input is recorded where the harness can read it." },
    {
      statement: "Every attribute point is earned at the fixed amount its attribute names.",
      workingMemory:
        "Strength 1000 kg lifted. Endurance 400 active calories. Constitution 100 g whole plants. Wisdom 10,000 net words added to all-about-alan topics. Intelligence 10,000 net words added to the five learn-everything sidecars. Charisma one hour where safety less difficulty is at least 1. Luck one rejection attempt. Words are counted per commit over whole files and never go negative. Bands are blue 2, green 1, yellow 0.5, red 0.25, else black. These amounts are pinned; the bands may be recalibrated.",
    },
    {
      statement: "The index the checks read holds every attribute page.",
      workingMemory:
        "The attribute page type and its seven pages landed through the glass in d2b757f1 and 16af44d6, because a page type a change adds is invisible to the checks that read the index, so the parent edge and the pages under it both dangle. `akasha index refresh` is the rebuild that would settle it and it throws ENAMETOOLONG on a persona-wallpaper description used where a file extension belongs.",
    },
    {
      statement: "Every attribute carries the points Alan has earned in it for all time.",
      workingMemory:
        "The lifetime total is a stock, and a stock is the class of fact aphantasia cannot hold, so it exists only where it is shown. Luck earns and levels but takes no daily tile, because rejection attempts are not daily and a permanently black tile would accuse him every morning.",
    },
    {
      statement: "Every attribute carries a level read from its points on the Fibonacci curve.",
      workingMemory:
        "Levels begin at 0 and cost 10, 10, 20, 30, 50, 80, 130, 210, 340, 550 points, so the totals to reach them are 10, 20, 40, 70, 120, 200, 330, 540, 880, 1430. Showing levels is deferred to the character sheet of the game these feed.",
    },
  ],
  constraints: [
    "Alan has total aphantasia, which means he has zero experiential memory or imagination. If it isn't in his immediate experience or conceptual map, it doesn't exist.",
    "Alan can store a fact about an experience only by memorizing it; he cannot simply remember one. Showing him something once does not make it known.",
    "Anticipated reward does not move Alan. Progress toward a milestone does, and so does awareness of a milestone not currently met.",
    "Alan is AuDHD and is recovering from severe autistic burnout, so executive function is a major bottleneck. Recovery is expected to run into 2030.",
    "Alan's harness carries his memory and his executive function; the game of it is how it works rather than what it is for.",
    "The gamification already built is mid-migration and parts of it will be rebuilt from first principles.",
    "Attribute points are counted forward from the day an attribute begins, and no earlier day is backfilled.",
  ],
} as const satisfies Initiative
