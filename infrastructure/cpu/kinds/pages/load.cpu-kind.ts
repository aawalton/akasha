import type { CpuKind } from "akasha/infrastructure/cpu/kinds/cpu-kind.page-type.types.ts"

export const load = {
  id: "01a0918b-8e9a-7420-a518-4753a2354569",
  type: "cpu-kind",
  slug: "load",
  definition: "how many threads were runnable or waiting on disk, averaged over a stretch",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Load counts a thread waiting on disk the same as a thread waiting for a processor.",
    },
    {
      invariantKind: "departure",
      statement: "Load above the number of processors is no processor shortage on its own.",
    },
    {
      invariantKind: "departure",
      statement: "The three numbers are averaged over one, five and fifteen minutes.",
    },
    {
      invariantKind: "departure",
      statement: "A load average is of the host rather than of any one program.",
    },
  ],
} as const satisfies CpuKind
