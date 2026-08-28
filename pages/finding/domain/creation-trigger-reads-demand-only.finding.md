---
id: 3af91845-2c6e-5103-b5a5-2b3bed945fc8
slug: creation-trigger-reads-demand-only
page-type-slug: finding
title: "Creation trigger reads demand only"
domain-slug: page-type/domain
---

# Claim

The trigger for drawing a domain enumerates demand signals only, so a region of the estate that plainly exists but has attracted none of them reads identically to a concern nobody needs.

# Evidence

`domains/domain.md` states the trigger: "A domain becomes a file the moment anything needs one — a persona given it to own, a finding filed against it, an initiative measured against it, a parent a child has to link through to reach the root… Nothing is drawn ahead of the need."

All four listed signals are signals of demand that has already arrived. None of them fires on a concern the estate operates inside and has not yet named.

Observed on 2026-08-05. A seat running `define-principle-or-rule` over the alert concern applied the trigger honestly and recommended the surface be held back: no persona owns `alert`, its two findings routed to `instrument` and `ops memory file-finding` accepted them there, no initiative names it, and nothing links through it. Every listed signal read absent. The seat's recommendation was to create it once a row was cut and let the row be the need.

Alan overruled it in one line: "we need the alert domain now, its obviously a critical system domain, though that points to a gap in the creation logic." `domains/alert.md` landed at `020c8ae3`. Nothing about the concern changed between the recommendation and the ruling — what the seat lacked was a signal the trigger does not carry.

The corpus is not consistent with the trigger either. `domains/gate.md` stands as a domain with exactly one finding filed against it (`pages/finding/old-gate/schema-read-chain-skips-fragments.finding.md`), which is the weakest of the four signals, while alert had two findings and they were routed elsewhere by a verb that accepted the routing.

The failure is silent in the direction that matters. A domain drawn without need is visible — the file is there and reads thin. A domain not drawn because no signal reached the trigger leaves nothing behind: the concern is worked inside, its observations route to whatever parent will take them, and nothing reports that they landed somewhere broader than they belong.
