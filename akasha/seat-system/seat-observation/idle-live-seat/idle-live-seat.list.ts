import type { List } from "../../domain-system/lists/list.page-type.ts"

export const idleLiveSeat = {
  id: "01a06862-a02e-7ce3-acaa-c4e902ab9c81",
  pageTypeSlug: "list",
  slug: "idle-live-seat",
  definition: "a seat whose process is live and whose work has stopped",
  members: [
    {
      memberName: "Task never ending",
      definition: "the seat's task names no initiative status, so nothing observable ends it",
    },
    {
      memberName: "Initiative outliving its work",
      definition: "the seat reads its dispatched initiative as running while its file still stands",
    },
    { memberName: "Sign-in expired", definition: "the last words are a request to log in again" },
    {
      memberName: "Silent partway",
      definition:
        "the seat fell silent short of hand-back, so what it states is honestly unfinished",
    },
    {
      memberName: "Stop announced and never run",
      definition: "the seat said it was stopping, and the command that would stop it never ran",
    },
    {
      memberName: "Held by a live child",
      definition: "the work reads finished, and a child resident for its own reason is read ahead",
    },
  ],
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
      statement:
        "The only licence to stop a seat holding no initiative row is a claim carried on its own last send.",
    },
    {
      invariantKind: "departure",
      statement: "A seat can end its turn having narrated an act it never took.",
    },
  ],
} as const satisfies List
