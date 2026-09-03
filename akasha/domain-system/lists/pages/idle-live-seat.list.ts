import type { List } from "../list.page-type.ts"

export const idleLiveSeat = {
  id: "01a06869-a968-7b5e-a3fc-1d9302ab9c81",
  pageTypeSlug: "list",
  slug: "idle-live-seat",
  definition: "a seat whose process is live and whose work has stopped",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Whether a seat states an assignment says nothing about whether it is idle.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript's modification time moves when no work has been done.",
    },
    {
      invariantKind: "departure",
      statement: "Stopping a seat holding no initiative row needs a claim on its own last send.",
    },
    {
      invariantKind: "departure",
      statement: "A seat can end its turn having narrated an act it never took.",
    },
  ],
  members: [
    {
      memberName: "Task never ending",
      definition: "the task names no initiative status, so nothing observable ends it",
    },
    {
      memberName: "Initiative outliving its work",
      definition: "the seat reads its dispatched initiative as running while its file stands",
    },
    { memberName: "Sign-in expired", definition: "the last words are a request to log in again" },
    {
      memberName: "Silent partway",
      definition: "the seat fell silent short of hand-back, so what it states is unfinished",
    },
    {
      memberName: "Stop announced and never run",
      definition: "the seat said it was stopping and the command that would stop it never ran",
    },
    {
      memberName: "Held by a live child",
      definition: "the work reads finished, and a child resident for its own reason is read ahead",
    },
  ],
} as const satisfies List
