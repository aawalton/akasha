---
id: b0a5ef7f-09f2-55a5-9174-b122cadaa212
page-type-slug: finding
title: "The agent forest reports a seat's recorded turn-start source as what that seat is waiting on"
domain-slug: domain/agent-harness
---

# Claim

The agent forest names a seat's recorded turn-start source as what that seat is waiting on.

# Evidence

`tools/agent-forest.ts` documents the field this way: "an idle seat whose turn start source names
anything but `none` is `idle-pending`, and `waitingOn` says what it waits on."

`tools/lib/seat-turn-state.ts` shows what the value is. `readSeatTurn` returns
`{ state: "idle-pending", waitingOn: source.value }`, where `source` is `turnStartSourceOf(agent)`
— a record of what arranged the seat's last turn start, stamped when that turn began.

So the value describes a past arrangement, and the sentence describing it is in the present tense
about an obligation. The two come apart wherever a seat's situation moved after its turn ended,
which is the ordinary case for a seat that handed back.

Measured 2026-08-19 over the four seats under `01a0004d-0dd4-7a23-94c1-fea622cd277a`, the whole
population there: all four carry `waitingOn: "held-wake"`, while `ops seat held-wake` — which opens
the project row — answers `work-complete` for two of them and `held-wake` for the other two.

The cost is not that the field is wrong. It is that a reader takes it for the question
`ops seat held-wake` answers, and there is nothing beside it saying otherwise. It misread that way
here, and a false finding was filed off it before the code was opened.
