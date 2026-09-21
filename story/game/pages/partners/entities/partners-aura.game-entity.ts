import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersAura = {
  id: "01a0c663-0c5b-731b-a6c1-d61446748ecf",
  type: "page-type/game-entity",
  slug: "partners-aura",
  title: "Aura",
  game: "game/partners",
  kind: "partner",
  level: 4,
  skills: [
    { name: "Gamecraft", progress: 0, effect: "none stated" },
    { name: "Sleight", progress: 0, effect: "none stated" },
    { name: "Odds-reading", progress: 0, effect: "none stated" },
    { name: "Footwork", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "The games-mistress of Amberford — wind-quick, runs the festival contests, wager-boards, and the annual Hearthlands race, and has never once been caught holding the house's edge. Titaness-old in the eyes if you catch her between laughs. FIRST-MEETING texture (Session 2, town by day): pulls Alan into a friendly wager just to take his measure, and loses interestingly if she likes him. LIGHT — a game, a laugh, a live wire; keep her canon join-hook (headline entrant at the festival games; afterward she tells him precisely which of his choices were the interesting ones) for her introOrder wave. Deep thread: she is the town's read on RISK — later the one who knows which roads have gone wrong and who's gone missing on the edges (early hollowbeast/Choir intel delivered as gossip over a game). Don't spend that yet.",
} as const satisfies GameEntity
