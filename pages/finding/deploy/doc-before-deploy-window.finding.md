---
id: 51ef8c21-2183-56af-a3a7-e7cd915c6eb0
page-type-slug: finding
title: "Doc before deploy window"
domain-slug: domain/deploy
---

# Claim

A `deliver` worker that writes an instruction citing code it lands in the same tree cannot avoid a window where the instruction is live in `~/instructions` (live on commit) before the cited code is live in main (live only at its manager's deploy), because the worker retires before its manager's deploy runs.

# Evidence

Project #17239 (status someday_maybe, live-on deploy, domain `deploy`); notes captured 2026-08-15, no objective written. Reported by #17188's manager, who observed it on their own tree and verified the break and closure with controls.

Mechanism: `~/instructions` is live for every agent the instant a write commits; code is live only at a deploy. Add-before-remove lands the mechanism first, then the instruction relying on it — a `deliver` worker can't obey that: it retires at the end of its own child; the deploy belongs to its manager, after every sibling lands. Citing code it just wrote leaves a worker two options, both wrong: write the doc (live, citing an absent mechanism, until the tree lands), or don't (the instruction never exists once the seat retires). The window opens at the write, closes at a deploy the writer can't perform.

Live instance: #17192's doc went live citing `packages/infra/checks/src/lib/exemption-control.ts` while absent from main (verified with a control). The worker sequenced the doc before the CLAUDE.md pointer — correct for that pair, irrelevant to the load-bearing one (doc-versus-deploy). The manager let the deploy close the window, then verified it with a control.

Cost: an agent booting inside the window loads an instruction naming a mechanism that doesn't exist yet — false on arrival, true later. Failure is silent: the agent follows the instruction, finds nothing, reports a missing file, not a premature doc. The `deliver` contract states no rule for this seam.

Not decided: whether workers never write instruction surfaces (manager writes at deploy), a staged write landing on deploy, or a citation form honest about not-yet-landed.

Second instance (discharged by the lead): `~/instructions/docs/messages-access-boundary.md` described only one of two legs the mailbox write boundary enforces, until noticed; the second leg landed on main with #16996/#17007. Doc was correct when written, wrong once the code landed; nothing fired.
