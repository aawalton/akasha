---
id: 0c6e5d54-84b9-5708-9a7d-9d87383bf998
slug: wake-source-row-half-ungated
page-type-slug: finding
title: "Wake source row half ungated"
domain-slug: page-type/agent
---

# Claim

The row half of the wake-source contract is not gated by anything: only the code half (`check-no-hardcoded-message-source` Rule 3) is CI-enforced, so a persona-row `senderMatch` that can never match produces no error, no wake and no metric, and is indistinguishable from the event simply never firing.

# Evidence

Project #16447 (domain agent, status someday_maybe). Filed by aranya from #16420's residual.

#16420 closed the code half of the wake-source contract: `check-no-hardcoded-message-source` Rule 3 is registered in the syntax bundle and demonstrably fires (54 tests / 71 expects).

The row half is not gated by anything. `wake-source-tags.smoke.test.ts`'s own docblock: no automated runner executes `*.smoke.test.ts` — CI runs `{unit, property, component}`, the workstation slow-suite gate runs `{integration, data, cli, database}`; invocation is manual, and row declarations are checked there and nowhere else. Run manually against production it passed with a real denominator (3 tests, 11 expects, credentials set, no `[smoke skip]` marker) — the invariant holds right now, but nothing reports when it stops.

The defect is the original one, relocated: an unfireable `senderMatch` produces no error, no wake, no metric. #16420 fixed this for code and left it fully live for row data: one persona-row edit can arm a rule that can never match, and the system's only response is silence.

Not CI: promoting the suite to `database` would couple every monorepo landing to mutable rows no commit controls. Not a periodic timer: it would burn tokens on the passage of time rather than the arrival of work.

Proposal (not decided): arm the invariant on persona-row writes, the only way an unfireable rule comes into existence — zero cost while nobody edits rows, immediate detection when someone does. `public.pages` write-boundary machinery already enforces `coherenceRules` atomically at the plpgsql boundary. Open question: a coherence rule on the `persona` page-type (rejecting the write, probably correct) or an event subscriber alerting after the fact; rejecting the write needs the live tag family resolvable inside the write boundary.

Row captured but never defined; this evidence is its capture moved off the retired `notes` attribute on 2026-08-15.
