import type { CpuKind } from "akasha/infrastructure/cpu/kind/cpu-kind.page-type.types.ts"

export const burned = {
  id: "01a0918b-43ad-70b9-9ac7-5c3d0b94bcf3",
  type: "page-type/cpu-kind",
  slug: "burned",
  definition: "processor seconds a program has spent running",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Seconds spent on more than one processor at once add together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A program waiting for disk or for a lock spends none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a run cost is asked in burned seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child that has been reaped has its seconds added to its parent's.",
    },
  ],
  createdAt: "2026-09-11T17:36:58.285Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies CpuKind
