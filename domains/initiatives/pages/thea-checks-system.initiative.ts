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
      statement: "Every check is green.",
      workingMemory:
        "144 refusals over 132 files in 74 families, from 197. Only 6 have a leg in checks/: shortened is a real duplicate, passingFor is a false pair, noNode and gone are bare literals. Alan removed the bar on opening a module, so a genuine duplicate now takes a home in a domain whose definition already names the thing. What cannot fold is framework exports a router finds by name, bare literals, and false pairs: a free name prints as written, and so does the type a name declares.",
    },
    {
      statement: "Every checksum annotation a workload has derives from a secret its page names.",
      workingMemory:
        "All 16 sites surveyed; every page now names what it hashes. 11 derive from a secret across 10 workloads; every value agrees with the live Secret, the generated yaml and the running pod. 5 hash config through a pure function of its argument, emitted from one value in one synth, so they cannot disagree. 3 mount a second Secret unhashed; 17 annotate none. The committed yaml pictures a thing that moves: authority is the reading at synth, and a diff against a fresh synth is the design working.",
    },
    {
      statement: "A check looks for unused code and passes.",
      workingMemory:
        "Settled 2026-09-10. The premise was wrong twice over: the finder was deleted rather than unwired, and its target repository tracks zero files because it moved here. The curation has no reader in akasha. A check is the wrong instrument: 3636 value exports across 1432 files are named by no importer, and a change-scoped check cannot see the fault at all, since a change to one file leaves another dead and the other is unchanged. Control: 1287 of 1287 test files have no importer.",
    },
    {
      statement: "No finding is filed on checks-system or any part beneath it.",
      workingMemory:
        "10 findings sit in the checks subtree, from 17; one names folder-matches-a-shape and is out of scope. Every one that went, went by mending rather than disposing: a check reading config through the change, a mirror holding only what the change carries, a process bound proven impossible rather than unbitten. Disposal cannot reach this. The tree filed 6, 2, 16, 24 and 28 over five days and 11 in four hours, one at 21:41 dead at 21:45.",
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
