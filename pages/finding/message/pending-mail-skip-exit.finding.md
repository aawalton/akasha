---
id: ca4de565-0cb4-53ef-be73-17393bc2344e
page-type-slug: finding
title: "Pending mail skip exit"
domain-slug: page-type/message
---

# Claim

Of the 508 stranded-undeliverable/stalled `messages` rows behind #17267, 175 were senderless and so unbounceable by `bounceStillPendingInbound` (which had written `bounced` only 11 times all-time and correctly declares, rather than fails, by never bouncing a senderless row since `bounced` means returned to sender); a one-time clear already run leaves that cause intact, so the mechanism that skips mail past Alan's 24-hour threshold is the exit those rows still lack.

# Evidence

Project #17279 (domain: message, status: someday_maybe, live-on: deploy); never defined with an objective — moved off the retired `notes` attribute on 2026-08-15. Child of #17267 (the parent problem: 508 undeliverable/senderless pending mail with no terminal value); sibling of #17278 (adds `skipped` to `MESSAGE_STATUSES`). This project is the skip mechanism itself.

Exploration: the cause under the symptom. `bounceStillPendingInbound` had written `bounced` 11 times all-time against 151 stranded-undeliverable rows — not failing, it DECLARES that it never bounces a senderless row, since `bounced` means returned to sender. 175 of the 508 were senderless: could not be delivered, could not be bounced, nothing else terminated them. A one-time clear (already run) leaves that intact; this project is the exit.

Intent:
1. Mail past the threshold is skipped. The threshold is Alan's 24 hours and is a named parameter, not a literal.
2. The skip records the disposition it was taken under — undeliverable vs stalled. Without it the alert-not-drained signal is swept along with the dead mail and nothing reports that it was.
3. Skip and bounce do not overlap: a row bounce can take is bounced, and skip takes only what bounce declares it cannot. Asserted, not assumed.
4. Both verdicts observed: seen skipping a row that qualifies AND declining one that does not. A mechanism that skipped everything would clear a one-sided test.
5. Runs on demand rather than on a timer where possible ("consume on demand"), or the timer is justified against that principle explicitly.

Bound, stated rather than implied: this gives the undrainable rows an exit. It does NOT establish that no producer is writing unreachable mail — that is a question about senders. The 330 `source=user` rows averaging 27.5 days are where that would start, and are not this project's work.
