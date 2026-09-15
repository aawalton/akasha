import type { CpuKind } from "akasha/infrastructure/cpu/kind/cpu-kind.page-type.types.ts"

export const load = {
  id: "01a0918b-8e9a-7420-a518-4753a2354569",
  type: "page-type/cpu-kind",
  slug: "load",
  definition: "how many threads were runnable or waiting on disk, averaged over a stretch",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Load counts a thread waiting on disk the same as a thread waiting for a processor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Load above the number of processors is no processor shortage on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The three numbers are averaged over one, five and fifteen minutes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load average is of the host rather than of any one program.",
    },
  ],
} as const satisfies CpuKind
