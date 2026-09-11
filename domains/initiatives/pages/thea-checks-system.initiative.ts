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
        "4 name domain/check, from 17, beside one naming folder-matches-a-shape that is out of scope. All were read against the tree and not one is dead. Alan ruled against a confinement check, for leaving shellcheck on the host, and for an audit service carrying the third away as two intents. The lua-runtime one is out of scope too: its subject states experimental at line 170. What is left waits on work rather than on Alan.",
    },
    {
      statement: "No gap invariant is written on checks-system or any part beneath it.",
      workingMemory:
        "8 in play, from 31, and it rose rather than fell: check-reaches-a-path-through-the-index left experimental carrying three. 5 more wait behind that flag on identifier-matches-its-place and no-unparsed-boundary-read, so it climbs as checks graduate. Two on repository-is-written-by-a-change cannot close. Two on model-running and one on invariant-earns-its-place serve a subsystem switched off at zero runs, and each is paired with a stopgap a deletion would orphan.",
    },
    {
      statement:
        "Audits run in a dedicated singleton service and are requested by agents, never run directly.",
      workingMemory:
        "audit-verdict keys a finding to a commit, audit-serving runs one check's audit under a turn of its own, and `akasha audit` named nothing asks the service and answers from the verdicts, costing no round where a verdict already answers for that commit. block-subagent-audit is turned around: a subagent's bare call reaches the service, and `--check` and `--file-path`, which judge in the caller's process, are refused. Left: those two flags, a seat's bench for a check that runs at no phase.",
    },
    {
      statement:
        "The singleton service runs every audit hourly and messages thea the failures to remediate.",
      workingMemory:
        "The first hourly round ran, and 49 of the 55 verdicts were in with two refusing. index-is-level-with-the-pages refused on 205 entries a folder move touched 48 seconds into the reconcile, which the span git names now drops. no-refused-syntax spent 20.7 processor seconds against the 15 its own page states, which is a check to make faster rather than a ceiling to raise. Left: watching one message reach thea, which nothing has yet shown end to end.",
    },
    {
      statement:
        "The index reconcile runs as an audit, so a skew between index and pages is found.",
      workingMemory:
        "index-is-level-with-the-pages runs the reconcile with nothing written and judges what it would have written, over 70,344 pages and 660,612 entries in about fifty processor seconds. Every drift it has found is churn rather than skew: an uncommitted file, or a commit landing while it ran. The first is dropped by name and the second by the span git says moved between the commit read before the reconcile and the one read after. Left: a round where it runs clean.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
