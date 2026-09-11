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
        "Built: audit-verdict keys a finding to a commit and answers for every ancestor of it, and audit-serving runs one check's audit under a turn of its own, joins askers in one process on one promise, and carries a verdict forward where git says nothing the check takes as input moved. Left: the service page and the deploy, and the request path an agent asks through. block-subagent-audit will have to refuse the seat too, which changes what a hook refuses and needs Alan.",
    },
    {
      statement:
        "The singleton service runs every audit hourly and messages thea the failures to remediate.",
      workingMemory:
        "serving runs every audit in a round and tells thea only the checks that turned from clean to refusing, one message for the round, so a check red last hour is not told again. writeMessage is proven from a plain process by service-watching. Left: the service-workstation page, hourly as royal-road-sync is, and a deploy. The seat-side receiver answered nothing all session, so delivery into thea is the one part nothing has shown working end to end.",
    },
    {
      statement:
        "The index reconcile runs as an audit, so a skew between index and pages is found.",
      workingMemory:
        "`akasha index refresh --dry-run` already reconciles and reports drift: 49.4s of processor time over 70,344 pages and 660,612 entries. Read in place it is no check. Every drift today is a live subagent page or seat edits file arriving while it runs, and the two aggregate listings move with them, so it would refuse hourly on churn that heals in seconds. refreshedFrom takes the index root, so the audit builds a scratch index and diffs the two, dropping whatever names an uncommitted file.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
