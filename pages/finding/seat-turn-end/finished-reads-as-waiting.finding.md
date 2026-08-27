---
id: fdde8a7b-ccfe-5cd0-b86b-1a152b3bc44f
slug: finished-reads-as-waiting
page-type-slug: finding
title: "Finished reads as waiting"
domain-slug: domain/seat-turn-end
---

# Claim

A seat that finished its work and said so is indistinguishable, at the turn-end guard, from one waiting on an answer. `awaiting-reply` is the comparison *newest sent is newer than newest received*, which reporting and stopping necessarily satisfies — the report is the last event in the conversation. Where the seat holds no project row nothing can contradict the timestamps, so it is granted an unbounded park it never asked for.

# Evidence

`ops seat outbound-wake --help` states the whole test: "awaiting-reply — its newest sent message is newer than its newest received one."

Measured 2026-08-10 near 13:30Z against the two live seats holding that verdict:

- `019fe8cb` — outbound 1786323018504, inbound 1786322666756: it sent 5.9 minutes after it last received. Last message opens "#18246 is verified and done."
- `019fe8ae` — outbound 1786320652293, inbound 1786320129421: 8.7 minutes. Last message opens "Everything Amy assigned is done and verified."

Both report `openQuestions: 0` and `liveChildren: 0` in the same JSON as the verdict. Neither had asked anything, and the fleet has a signal for a seat that did — `open-question`, from `ask-alan` — so the evidence against the park stood beside the verdict granting it.

What separates the two cases is the project row, not this test. `tools/lib/headless-halt-wake.sh` takes the allow on the `no-binding` arm alone, under a comment reading "A resident handler that sends and waits keeps its park; a worker that files a report mid-implementation does not get one." That distinction is `held-wake`'s: a worker mid-work has a row naming its own act as next. `ops seat held-wake --json` answers `no-binding` with `statuses: []` for both seats above, so no row speaks and the composition reduces to the comparison.

The same hole, other face: across `~/agents/hook-decisions/*.jsonl` from 2026-07-28 to 2026-08-10, `block no-binding` is the largest block class at 317 records, and reaching that arm means the seat sent nothing. A rowless seat is blocked for sending nothing or parked for sending anything, and finishing is sending.

NOT MEASURED. How many of the 437 `allow awaiting-reply` records sat on a completed report rather than a live question. Whether `open-question` reading zero is a reliable negative, which needs every real ask to go through `ask-alan`. Whether a rowless seat has a legitimate park this predicate is the only carrier for; if it has, the repair is not simply narrowing it.
