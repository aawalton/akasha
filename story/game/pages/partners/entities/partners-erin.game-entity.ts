import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersErin = {
  id: "01a0c663-0ca1-7ed4-99df-0be6d3b6755b",
  type: "page-type/game-entity",
  slug: "partners-erin",
  title: "Erin",
  game: "game/partners",
  kind: "partner",
  level: 3,
  skills: [
    { name: "Innkeeping", progress: 0, effect: "none stated" },
    { name: "Boardplay", progress: 0, effect: "none stated" },
    { name: "Read-the-Room", progress: 0, effect: "none stated" },
    { name: "Brawl-breaking", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "Innkeeper of The Wandering Door on Amberford's square. Broad, quick-laughed, remembers every face and what they drank; a Hearth-sister who clocks a home-shaped soul on sight. FIRST-MEETING texture (Session 2, town by day, the return-for-her-things errand): warmest welcome in town, a free cup 'for the man who lit the old hill', a read of Alan more accurate than she lets on. LIGHT only — face, warmth, a standing invitation; her canon join-hook is later (the party takes rooms after their first hollowbeast fight — she comps the stew and beats him at the board in eleven moves). Deep unspoken thread: her inn's sign is a door attached to no wall — a Concord joke she doesn't know is true (ties to the hearthstone's eventual Wandering stage). Do not spend depth at first meeting.",
} as const satisfies GameEntity
