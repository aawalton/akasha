import type { CpuKind } from "akasha/infrastructure/cpu/kinds/cpu-kind.page-type.types.ts"

export const stall = {
  id: "01a0918b-a51f-7d82-80da-02dff45a7313",
  type: "cpu-kind",
  slug: "stall",
  definition: "time work waited for a processor that work could have used",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Stall is the kind that says whether a shortage hurt.",
    },
    {
      invariantKind: "departure",
      statement: "A host fully busy with nothing waiting stalls none.",
    },
    {
      invariantKind: "departure",
      statement: "The kernel keeps stall for each cgroup as well as for the host.",
    },
  ],
} as const satisfies CpuKind
