import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const cpuLimit = {
  id: "01a09185-b1c1-72a5-80f6-cd1ba1a44dd6",
  type: "page-type/domain",
  slug: "cpu-limit",
  definition: "the most processor time one thing may take, and what happens when it wants more",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A limit on processor time slows the thing limited rather than ending it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling is stated as processor time over a period, and both are part of it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A thing at its ceiling waits for the next period rather than being refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A ceiling holds even where every other processor is idle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A share decides who goes first only while more than one thing wants a processor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A share left unspent by one thing is taken by another rather than kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every agent, service and container on the workstation runs under a stated share.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The desktop outranks the apps, and the apps outrank everything akasha runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run past its processor ceiling runs to its end rather than being stopped there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "What a run past its ceiling judged does not land.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run stopped partway leaves the agent nothing to mend that run by.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Every processor limit is the value of a page property.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Refusing what a run answered is how a processor ceiling is enforced.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A processor ceiling drives down what a run spends rather than keeping the host safe from that run.",
    },
  ],
} as const satisfies Domain
