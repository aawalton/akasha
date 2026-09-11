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
        "Nothing runs one today. audit.command.ts states the absence that nothing schedules this command, beside the absence that nothing holds the folder still while an audit runs, and the second is the harder half: this tree takes a commit every 13 seconds from a dozen seats, so a run over every file moves under itself. 32 modules call runMechanicalChange, and change-mechanical carries the gap that the audit finds the faults a mechanical change lands.",
    },
    {
      statement:
        "The singleton service runs every audit hourly and messages thea the failures to remediate.",
      workingMemory:
        "Alan's wording: the service runs all audits once per hour and sends failures to thea for remediation through a message. Nothing schedules an audit now, read live off 29 user timers, 8 system timers and 75 unit files, none naming the repository. How a failure reaches a seat is unproven here: the messages server has answered nothing all session.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
