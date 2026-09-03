import type { Module } from "@akasha/code-system/module"

export const ciDispatchReservations = {
  id: "01a06861-24c9-7003-9b6b-f1d70046c774",
  pageTypeSlug: "module",
  slug: "ci-dispatch-reservations",
  definition: "the room a launched container holds until the cluster reports it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reservation is dropped once the cluster reports the container it stands for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reservation the cluster never reports is dropped once it outlives its time to live.",
    },
    {
      invariantKind: "departure",
      statement: "A container already reserved is not reserved a second time.",
    },
  ],
} as const satisfies Module
