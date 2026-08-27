---
id: 114642b2-7d2b-5919-9eaf-1f6c89ef967a
slug: forward-marker-breaks-on-rename
page-type-slug: finding
title: "Forward marker breaks on rename"
domain-slug: task/prepare-interview
---

# Claim

The forwarding marker `prepare-interview` arms names the recorder by seat name, so the recorder restating any attribute renames it and every later turn fails silently.

# Evidence

Stage 5 of the task says to write the recorder's name into `~/agents/$AGENT_ID/forward-to` and to confirm the channel fired by finding `~/agents/$AGENT_ID/forward-turn.log` after the first turn. Both were done on the session that opened `my-strategy`, and both passed.

A seat's name is composed from what it states, so it moves whenever an attribute is re-stated. The recorder was spawned as `aine-books-repo-recorder`, and was then told to restate its domain onto the folder once that folder existed — which renamed it `aine-my-strategy-recorder`. The marker still named the old one.

Measured on that session: 2 turns forwarded, then 48 consecutive failures logged as `[ops] No agent currently holds the name 'aine-books-repo-recorder'`. The corpus held one file, written at 06:44, while the substantive four hours of the session reached nobody. Nothing raised it — the hook writes its receipt to a log no one reads, the recorder cannot report an absence it was never told to expect, and the interviewer asserted twice that the corpus was being written before checking it.

The confirmation stage 5 prescribes is a one-time check at the first turn, which is exactly when the marker is still correct.
