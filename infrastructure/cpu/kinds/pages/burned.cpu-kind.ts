import type { CpuKind } from "akasha/infrastructure/cpu/kinds/cpu-kind.page-type.types.ts"

export const burned = {
  id: "01a0918b-43ad-70b9-9ac7-5c3d0b94bcf3",
  type: "cpu-kind",
  slug: "burned",
  definition: "processor seconds a program has spent running",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Seconds spent on more than one processor at once add together.",
    },
    {
      invariantKind: "departure",
      statement: "A program waiting for disk or for a lock spends none.",
    },
    {
      invariantKind: "departure",
      statement: "What a run cost is asked in burned seconds.",
    },
    {
      invariantKind: "departure",
      statement: "A child that has been reaped has its seconds added to its parent's.",
    },
  ],
} as const satisfies CpuKind
