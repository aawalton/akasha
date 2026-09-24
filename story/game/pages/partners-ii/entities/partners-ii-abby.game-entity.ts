import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const partnersIiAbby = {
  id: "01a0c663-2085-71ee-b901-2e1a29f0f18e",
  type: "page-type/game-entity",
  slug: "partners-ii-abby",
  title: "Abby",
  game: "story-game/partners-ii",
  kind: "partner",
  level: 3,
  skills: [
    { name: "Reading People", progress: 0, effect: "none stated" },
    { name: "Booklore", progress: 0, effect: "none stated" },
    { name: "Town Records", progress: 0, effect: "none stated" },
    { name: "Discretion", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "Amberford's bookshop-keeper — the shop is secretly the town's living room, where people drift in to be quietly cared for whether or not they came for a book; filed her long foreign name down to Abby for the high street. Sees exactly what people won't say and gives the care anyway — chosen, unasked-for, never billed. FIRST-MEETING texture (Session 2, town by day): the title on Hearthholt is irregular (a manor that grew itself has no clean deed), and Abby is the one the town points to — not a broker, the bookshop-keeper everyone brings their tangles to — who NOTICES and offers to help simply because he needs it, no fee and no ledger. This IS her canon join-hook seed (the party is sent to her to sort the deed; she asks Alan three questions, is caring for him before he has finished answering, and quietly decides she means to look after him). LIGHT at first meeting — a warm hand with a real tangle + a person who sees more than she says; keep the three-questions scene for her introOrder wave. Deep thread: she is the town's soft information node and the first to say the word 'Concord' aloud without knowing what it means.",
} as const satisfies GameEntity
