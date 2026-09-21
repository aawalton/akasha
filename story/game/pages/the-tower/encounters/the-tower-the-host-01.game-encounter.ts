import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerTheHost01 = {
  id: "01a0c664-942c-7333-916a-f96938061df5",
  type: "page-type/game-encounter",
  slug: "the-tower-the-host-01",
  title: "The Host (Warden of the Haven) — Phase 1, the Weaver",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-05",
  entities: ["game-entity/the-tower-the-host-01"],
  readableTrait:
    "The loom of the false haven, 144 HP — phase 1 is IDENTIFICATION, not HP. Threatened, it SPLITS into identical decoys (5, then 7) ringing the table, and — unlike the rooms before — each decoy now fakes EVERY cheap tell at once (shadow, heat, reflection), because the haven has climbed the whole ladder with him. So the plain tools are spent. The real one is found by: (a) his EMBER FLARE / salting the room with real fire — reveals ALL projections at once for a turn (coordinator: the true-Host strike that turn is at intent +2 and UNMITIGATED), and (b) the den's triangulation (the real Host loops least, displaces dust/grit, and sits truly at the head where the floor slopes down). Striking any decoy ×0.25 (~22-25/hit on 144) AND each wrong strike the real Host lands an intimate counter (~67 to Alan's 124 — two wrong reads is near-death) and reshuffles. A confirmed true-Host strike ×3 (~299) does NOT kill it — it CRACKS the haven and triggers PHASE 2 (the note: 'kill it twice'). WILL-gate (his second-best axis, load-bearing): the haven pulls steadily to relax/trust/do-nothing; his iron WILL (mentDef 35.5) makes him resistant IF he leans on it — a reader recognizes the comfort as foreign and acts. Brute-clearing seven decoys is a counter-stacked slog that kills him first.",
  trigger: "raising a weapon to the Host / forcing the false exit (PHASE 1 — the decoy-weaver)",
  drop: "(phase 1 banks no reward on its own — the cracked haven flows directly into phase 2; reward is on the true-form kill)",
  gates: [
    {
      name: "struck at a decoy",
      multiplier: 0.25,
      note: "Threatened, the loom rings the table with identical decoys faking every cheap tell at once. A wrong strike also draws an intimate counter and a reshuffle.",
    },
    {
      name: "a confirmed strike on the true Host",
      multiplier: 3,
      note: "Real fire salted through the room shows every projection for a turn, and the den's dust triangulates the one that loops least. The strike cracks the haven rather than killing it.",
    },
  ],
} as const satisfies GameEncounter
