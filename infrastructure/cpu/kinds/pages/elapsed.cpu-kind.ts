import type { CpuKind } from "akasha/infrastructure/cpu/kinds/cpu-kind.page-type.types.ts"

export const elapsed = {
  id: "01a0918b-5d77-77e9-9bd0-270d718d0181",
  type: "cpu-kind",
  slug: "elapsed",
  definition: "time that went by while a program ran",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Elapsed time counts while a program waits as well as while a program runs.",
    },
    {
      invariantKind: "departure",
      statement: "Elapsed time under burned time means the work ran on more than one processor.",
    },
    {
      invariantKind: "departure",
      statement: "How long a person waited is asked in elapsed time.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling on elapsed time bounds waiting rather than bounding processor time.",
    },
  ],
} as const satisfies CpuKind
