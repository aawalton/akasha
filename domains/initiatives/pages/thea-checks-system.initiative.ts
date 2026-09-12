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
    {
      statement: "No gap invariant is written on checks-system or any part beneath it.",
      workingMemory:
        "3 in play, from 31, all on the model checks, and 5 more wait behind the experimental flag on identifier-matches-its-place and no-unparsed-boundary-read. The three on check-reaches-a-path-through-the-index closed at 1384333f09 and the two on repository-is-written-by-a-change at 37e471c7dd and 2e9bc728d6, each having named a state the check's own model cannot reach, so each is an absence now. The last three wait on one call: whether the model checks, at zero runs, are built out or taken away.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
