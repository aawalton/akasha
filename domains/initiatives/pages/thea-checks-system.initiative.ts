import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "thea-checks-system",
  domain: "domain/check",
  persona: "thea",
  intents: [
    {
      statement: "No finding is filed on checks-system or any part beneath it.",
      workingMemory:
        "7 findings name domain/check and none names a part beneath it, from 17; one names folder-matches-a-shape and is out of scope. Every one that went, went by mending rather than disposing: a check reading config through the change, a mirror holding only what the change carries, a process bound proven impossible rather than unbitten. Disposal cannot reach this. The tree filed 6, 2, 16, 24 and 28 over five days and 11 in four hours, one at 21:41 dead at 21:45.",
    },
    {
      statement: "No gap invariant is written on checks-system or any part beneath it.",
      workingMemory:
        "5 in play, from 31; 9 more sit on experimental pages and are out of scope. Six went this stretch. page-matches-its-type's closed by making an entry file an input, which turned up relation-resolves having already written that rule privately, so it folded onto change-walking. Of the five left, two on repository-is-written-by-a-change cannot close, one is Alan's model spend, and two on model-running serve no live case: the one model check states zero runs, so it never runs.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
