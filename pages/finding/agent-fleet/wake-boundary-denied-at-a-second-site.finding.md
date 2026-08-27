---
id: f4287cc2-2204-5763-9f8d-86d891740334
slug: wake-boundary-denied-at-a-second-site
page-type-slug: finding
title: "Wake boundary denied at a second site"
domain-slug: domain/agent-fleet
---

# Claim

The overstated `wakeAgent` bound recorded for `wake-armed-seats.ts` stands at a second live site the standing finding does not name: `packages/agents/routing-core/src/decide-wake-match.ts` tells its reader "Making the question compulsory needs a write boundary, which is a different mechanism from this one and does not exist." That boundary exists and refuses. The same paragraph was left clipped mid-sentence by the commit that retired `isRetired`.

# Evidence

Read `decide-wake-match.ts` and `packages/agents/shared/db-messages-write.ts` whole against `~/code` on 2026-08-07, while ingesting `dirty/code/packages-agents-routing-core-claude.md`.

WHAT IS NEW HERE. `pages/finding/agent-fleet/wake-guard-bound-overstated.finding.md` records this bound as overstated in `wake-armed-seats.ts` and names only that file. Its sibling carries the same claim more strongly, under a heading inviting trust in it: "## What this does NOT do, stated because the surface it replaces overclaimed", then "`wakeAgent` is reachable directly, so a writer can put a message in an inbox without ever coming here — and nothing in this function can tell that it happened, because being unasked leaves no trace."

Verified the refusal directly rather than from the standing finding. `db-messages-write.ts` types `wakeAgentObserved` as taking `InboundRow & { readonly warrant: WakeWarrant; readonly client?: MessageClient }`, so a caller omitting the warrant does not typecheck. The body's first statement is `enforceWarrant("wakeAgent", input, input.warrant)`; `enforceWarrant` runs `decideEmission` and `throw`s on `!decision.allow`.

THE SAME PARAGRAPH IS DAMAGED. It reads:

    because being unasked leaves no trace. The one such writer we know of
    That a writer skips this question is worth noticing for exactly what it is worth. One that skips
    question fails silently, ...

`git show 8aed19c1a2^` has it whole: "The one such writer we know of (`agent-death-principal-notice.ts`) refuses a retired recipient on its own row read". Commit `8aed19c1a2`, "18061: retire the concept of a retired seat", removed the lines naming that writer — correctly, they turn on a retired recipient — and left the introducing clause with no object plus an ungrammatical "One that skips question fails silently". Nothing reported it; no check reads prose for sense.

NOT MEASURED: whether other files carry the sentence; whether `8aed19c1a2` clipped prose elsewhere.
