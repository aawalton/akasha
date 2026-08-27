---
id: 34e49200-645b-5fc1-b3f2-3a02a93cc00c
slug: forwarding-fails-silently
page-type-slug: finding
title: "Forwarding fails silently"
domain-slug: role/interviewer
---

# Claim

The interviewer's forwarding channel fails silently when the recorder dies mid-session, and she goes on talking with nothing recording. `prepare-interview` has her confirm the hook fired after the first turn; that confirmation is about the hook and passes for the rest of the session whatever happens at the other end. Refused sends land in a log nothing puts in front of her.

# Evidence

Session `38501837` on 2026-08-06, seat `019fd746-039b-7956-b7d2-7c93e7cea091`.

The channel was repaired at 12:50 and three turns landed: 13:08, 13:11, 13:16. Corpus commit `7898627` at 13:18 is the last thing the recorder wrote.

From 13:21 every send was refused with `recipient 'abby-all-about-alan-recorder' is a non-wake-armed standing seat whose current holder is provably dead`. Eleven refusals accumulated in `~/agents/<id>/forward-turn.log` between 13:21 and 14:05 — forty-four minutes and eleven turns of the subject's own words, covering the design of the safety-level widget, the correction that a morning reading fails the blank check, the correction that Jen must be the initiator, and the decision that continuous truth arms her guard.

Nothing raised any of it. The interviewer answered the subject throughout and had no signal. It surfaced only because the subject asked an unrelated question about how compaction affects the recorder, which sent her to the log.

There is no recovery inside the mechanism either. `forward-turn.sh` folds the transcript down to the last human entry, so the retry its comment describes retries only the current turn: once the subject speaks again, the failed turn is unreachable by the hook forever. The comment's claim that a failed send "is retried at the next stop rather than silently dropped" holds only while nobody is speaking.

Recovery was possible only from outside the mechanism: the transcript still held all 3,936 entries, so the eleven turns were re-extracted with the same predicate the hook uses and sent to a respawned seat as one backlog.

Compaction was not the fault and does not break forwarding: `session-current` recorded `source: "compact"` against the same `session_id` and the same `transcript_path`, the file kept its full history, and the compact summary was correctly excluded by `.origin.kind == "human"`.
