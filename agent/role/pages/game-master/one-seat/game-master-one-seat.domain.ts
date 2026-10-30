import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const gameMasterOneSeat = {
  id: "01a18cf2-69e2-71f8-ba02-711ebda01645",
  type: "page-type/domain",
  slug: "game-master-one-seat",
  definition: "how a seat that runs a story makes every step of the story",
  directives: [
    {
      directiveKind: "directive-kind/rule",
      name: "Work The Checklist",
      act: "In a one-seat story, run `akasha story turn next` on a turn's notice, and work every item it hands.",
      warrant: "A one-seat story starts no other seat, so every step of its turn waits on you.",
      aids: [
        "Each advance answers with the next item; take it up at once, until one says the turn is at player.",
        "While an item is open, you hold its role, and work by the role page it names.",
        "A rule of one role barring another role's work never bars you from that role's item.",
        "So Off The Table, Beats Not Prose and Numbers To Mechanics bar no item of yours.",
        "Nor do Ask The World Builder, Define no mechanic, or a recorder's Draft, Never Land.",
        "Mend a refusal an item meets yourself, as Unstick The Seat says of a seat's refusal.",
      ],
    },
  ],
  createdAt: "2026-10-30T13:14:19.489Z",
  updatedAt: "2026-10-30T14:57:46.131Z",
} as const satisfies Domain
