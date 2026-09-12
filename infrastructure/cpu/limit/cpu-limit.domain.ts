import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const cpuLimit = {
  id: "01a09185-b1c1-72a5-80f6-cd1ba1a44dd6",
  type: "domain",
  slug: "cpu-limit",
  definition: "the most processor time one thing may take, and what happens when it wants more",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A limit on processor time slows the thing limited rather than ending it.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling is stated as processor time over a period, and both are part of it.",
    },
    {
      invariantKind: "departure",
      statement: "A thing at its ceiling waits for the next period rather than being refused.",
    },
    {
      invariantKind: "departure",
      statement: "A ceiling holds even where every other processor is idle.",
    },
    {
      invariantKind: "departure",
      statement: "A share decides who goes first only while more than one thing wants a processor.",
    },
    {
      invariantKind: "departure",
      statement: "A share left unspent by one thing is taken by another rather than kept.",
    },
    {
      invariantKind: "departure",
      statement: "Every agent, service and container on the workstation runs under a stated share.",
    },
    {
      invariantKind: "departure",
      statement: "The desktop outranks the apps, and the apps outrank everything akasha runs.",
    },
    {
      invariantKind: "gap",
      statement: "Every processor limit is the value of a page property.",
    },
  ],
} as const satisfies Domain
