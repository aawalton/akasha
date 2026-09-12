import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "A check refuses TypeScript in akasha that calls an `akasha` command.",
      workingMemory:
        "Alan approved this check on 2026-09-11. Nothing in TypeScript calls one today, so the check lands green and guards the state rather than repairing it. Four shell scripts do call one and are the intended way to drive a machine: bootstrap-namespace, create-tunnel, provision-workstation and the akasha-launcher dispatcher, so the check reaches TypeScript alone. A check for this was here before and went in the transitions, so the history is worth reading for the rule it had.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
