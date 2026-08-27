---
id: 70597567-54c6-5c3e-96f0-f814ca643264
slug: watcher-realtime-silent-outage
page-type-slug: finding
title: "Watcher realtime silent outage"
domain-slug: domain/watch
---

# Claim

Watcher Realtime was failing to connect for over 72 hours with nothing alerting on it, and the log volume observed over that window contradicts the stated reconnect backoff — one of the two readings (the backoff as documented, or the log volume) is wrong.

# Evidence

From project #16023 (domain `watch`, status `someday_maybe`, created 2026-07-25T09:54:58Z, owned by nimue). The row's `# Notes` body was empty in the memory file this conversion read; the entire observation was carried in the row's title rather than its notes, recovered by reading the title directly via `ops project show 16023`.

Title, verbatim: "Watcher Realtime has been failing to connect for 72+ hours with nothing alerting — and the log volume contradicts the backoff, so one of the two readings is wrong."

No further detail (no code excerpt, no measurements, no acceptance criteria) exists anywhere on the row beyond this sentence. Two facts are asserted together and flagged as inconsistent: the connection has been down 72+ hours with no alert firing, and the volume of logs produced over that window does not match what the documented reconnect backoff would produce if it were actually running — meaning either the outage duration, the alerting's silence, or the backoff's documented behavior is not what it is believed to be, and which of those is wrong was left undetermined.
