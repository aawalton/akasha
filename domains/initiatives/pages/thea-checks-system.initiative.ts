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
        "4 name the check domain, from 17, and the lua-runtime one is out of scope: its subject states experimental. The cause of a-new-unique-property-costs-the-gate-minutes is in the code rather than in a run: wherever a property unique kind turns, index-settling loads every page the index names and files each twice through identityIn, and beside-turning states that sweep as a departure. Left is timing it. The other two wait on a deploy gate from a tracked-tree install and on an install that prunes.",
    },
    {
      statement: "No gap invariant is written on checks-system or any part beneath it.",
      workingMemory:
        "5 in play, from 31. The three on check-reaches-a-path-through-the-index closed at 1384333f09, each restating what a probe measured rather than naming a state to reach. 5 wait behind the experimental flag on identifier-matches-its-place and no-unparsed-boundary-read. Two on repository-is-written-by-a-change want a `.gitignore` below the root read, which loosens the check, and a write followed through a wrapper. Three serve the model checks, at zero runs.",
    },
    {
      statement:
        "Audits run in a dedicated singleton service and are requested by agents, never run directly.",
      workingMemory:
        "audit-verdict keys a finding to a commit, audit-serving runs one check's audit under a turn of its own, and every `akasha audit` run asks the service and answers from the verdicts, costing no round where a verdict already answers for that commit. `--file-path` is gone and `--check <slug>` names the checks a round runs, so a seat's bench for a check that runs at no phase is that flag through the service. Left: block-subagent-audit refuses a narrowing that now costs no more than a bare call.",
    },
    {
      statement:
        "The singleton service runs every audit hourly and messages thea the failures to remediate.",
      workingMemory:
        "The loop is proven whole: the round at 04ada7c1e5 answered all 56 checks, named 4 newly refusing in one message to thea, and I read that message and it is gone. The first message quoted a test run at 355,802 bytes, so the sender now shortens each refusal, holds the body to 19,000, and names the verdicts file. Every check but tests-pass answers with no refusal, and tests-pass has no failing test left. Left: a round measuring it green, once a seat mends the file over five processor seconds.",
    },
  ],
  constraints: [
    "An experimental check is out of scope.",
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
