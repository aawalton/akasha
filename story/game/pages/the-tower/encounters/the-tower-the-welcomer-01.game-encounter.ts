import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheWelcomer01 = {
  id: "01a0c664-93fd-73cb-808d-124dd932baa4",
  type: "page-type/game-encounter",
  slug: "the-tower-the-welcomer-01",
  title: "The Welcomer",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-05",
  entities: ["game-entity/the-tower-the-welcomer-01"],
  readableTrait:
    "A slight, cold predator wearing a kind climber's face (PRESENCE 16 / FINESSE 14 sell it; frail — 82 HP, no armor). GATE — TRUST is the danger (the social mirror of floor 4's dark). Its weapon is the WELCOME: if Alan accepts aid / sits / lets it close, it strikes intimate from full trust — coordinator: opening blow at intent 6-8 vs a flat-footed Alan (~53-70 to his 124 HP, and it presses before he recovers; not the VIT-6 near-kill the Stalker was, but brutal and spiraling if he keeps trusting). Striking the PRESENTED kind figure ×0.25 (a woven image). It is REVEALED by the TIER-2 tell — the plain shadow-tell is faked here, so use the EMBER HEAT-SHADOW (real flame shows a real body's heat-warped shadow; the glamour's is cold) — or by the mirrors deeper in; the true cold form then takes ×1.8 and his INT read of its real lunge earns intent 8+. The wrong read — taking it at its word, the flask, the seat — gets him knifed from arm's reach. It mirrors a face he WANTS to trust; a reader trusts no one the haven hands him, and refuses every comfort.",
  trigger:
    "accepting the Welcomer's aid/rest in the Hall of Welcome, OR moving deeper, OR revealing/striking it",
  drop: "a false-face shard (glamour/illusion-affinity seed — woven light holding a borrowed face) and its true hide (thin, cold, light-drinking like the Stalker's lens — crafting material toward a concealing garment)",
  gates: [
    {
      name: "struck at the kind face it presents",
      multiplier: 0.25,
      note: "The kind climber's face is a woven image, so a blow lands on light.",
    },
    {
      name: "struck once the true cold form shows",
      multiplier: 1.8,
      note: "The plain shadow-tell is faked here. Real flame throws a heat-warped shadow off a real body and the glamour's is cold; the mirrors deeper in show it too.",
    },
  ],
} as const satisfies GameEncounter
