import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "No finding is filed on checks-system or any part beneath it.",
      workingMemory:
        "2 in scope, from 17. Two more are out: a-name-place-check-reaches-the-vendored-lua-runtime, whose subject states experimental, and thirteen-flat-pages-folders, filed on folder-matches-a-shape, which states experimental as well. five-rows-of-a-model-tests-cases went at c39d1602929, relation-resolves refusing no row of it now. The two left are the deploy gate, whose frozen-install half inverted under the root manifest's glob, and the install that prunes.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
