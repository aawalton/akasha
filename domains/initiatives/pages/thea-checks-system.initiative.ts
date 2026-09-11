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
        "Alan's shape: the unit is one check's audit rather than the whole run, concurrency is one per check rather than one per service, and an agent asks at a commit, answered by a clean result for that check at a commit at or after it. One run serves every asker beneath it. That keying is also the answer to a tree moving under a run, a verdict being true of a commit rather than of a moment. service-workstation is the mechanism, hourly already in use by royal-road-sync.",
    },
    {
      statement:
        "The singleton service runs every audit hourly and messages thea the failures to remediate.",
      workingMemory:
        "writeMessage lands a message page and is proven from a plain process by service-watching, a oneshot systemd unit with no agent near it, so the sending half is solved. No command sends one, by an absence on seat-system; the reach is the module. The seat-side receiver answered nothing all session, so delivery into thea is unproven. A cost line cannot tell a check that threw from one that refused once, both writing found.length, so the service reads rows rather than counts.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
