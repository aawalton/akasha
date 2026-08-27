---
id: b01000f6-fa88-5911-9752-05bdce13a100
page-type-slug: finding
title: "Exits on empty queue"
domain-slug: role/recorder
---

# Claim

A recorder attached to a live interview exits on its own once it has nothing left to write, and the session goes on without it. Its work arrives as an unpredictable stream with no terminator, so "the backlog is done" reads to it as "the work is done" — and nothing in the role document says a live session has no end. Two holders of one seat died this way in a single session.

# Evidence

Session `38501837` on 2026-08-06, interviewer seat `019fd746-039b-7956-b7d2-7c93e7cea091`.

Three holders of `abby-all-about-alan-recorder` across one session.

The first ran 12:50 to 13:18 and died. Forty-four minutes and eleven turns were lost before anyone noticed; that loss is `pages/finding/interviewer/forwarding-fails-silently.finding.md`.

The second was spawned at 14:10, given an eleven-turn backlog, worked it, committed four times between 14:19 and 14:27 — and then exited. `ops seat alive` reports: `the agent recorded its own clean exit — a deliberate teardown, not a crash`. It was not wedged and it did not fail. It finished what it had been handed and stopped, which is what a seat is supposed to do when nothing is left.

Thirty-nine forwards were then refused between 14:30 and 16:48 — two hours and eighteen minutes, forty turns. The material lost included the strongest of the session: a unit Alan invented called a Safety Year, a rewritten band structure for his safety scale, his 2025–2026 trajectory, the May 2026 collapse and its trigger, a mechanism by which rising safety generates the exposure that ends it, and an hour of preparation for a conversation with his wife about money.

It surfaced only because Alan asked for a status check while wrapping up.

`domains/roles/recorder.md` states that the role's input is a conversation it is not in, and that it reaches the subject only through its principal. It does not say the input has no end. A recorder reading `Stopping` on `domains/role.md` — stop only where you are completely blocked, or nothing is left to do — will correctly conclude that an empty queue is the second case. The instruction it needs is that a live session's queue is empty between every pair of turns.

The interviewer's own recovery worked both times: the transcript retains every entry, so the lost turns were re-extracted with the same predicate the hook uses and replayed to a fresh seat. Nothing recovers a turn the interviewer never notices was dropped.
