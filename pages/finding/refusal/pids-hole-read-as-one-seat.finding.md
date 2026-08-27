---
id: 50fdfad4-0de6-5440-9c54-1aa3799f2089
slug: pids-hole-read-as-one-seat
page-type-slug: finding
title: "Pids hole read as one seat"
domain-slug: page-type/refusal
---

# Claim

The refusal bodies `tools/checks/hooks-delivered.ts` prints disagree over the number the `{pids}` hole carries. It is filled with a joined list of process ids, and some bodies speak of `that seat` around it while others speak of `those seats`. Where the group holds more than one, a body written singular tells a reader that one seat is affected and names several in the same sentence, so cycling one of them reads as closing the matter.

# Evidence

Found while reading `refusals/hook-registered-after-launch.md` on 2026-08-11, which was rewritten to the plural; the rest of the family was left standing.

`tools/checks/hooks-delivered.ts:284` fills the hole with `group.map((seat) => seat.pid).join(", ")`, where a group is the seats sharing one payload that also share a launch revision, per `byLaunch`.

Measured on the live fleet that day by replicating `byLaunch` over `seatsUnder()` and `historyOf`: 20 seats carrying a payload, on 2 payloads, forming groups of 13 pids and of 7. Neither group held one seat.

Rendered through `refusalText` with three pids, the body then read `after pid 581234, 581999, 582301 started, so no payload that seat could have been handed carries it`.

Singular at the time of the reading: `hook-dropped-since-launch`, `hook-missing-from-payload`, `hook-missing-from-payload-unsettled`, `hook-extra-in-payload`, `hook-extra-in-payload-unsettled`. Plural: `hook-payload-unreadable`, `hook-payload-not-json`, and `hook-registered-after-launch` after the rewrite.

What was weighed against landing the plural across the other five in the same run: each of them carries `reviewed-at: 2026-08-11`, written by a seat that read it line by line that same day, and `tools/stale-reviews.ts` measures churn from the commit that wrote the record. Their sentences also differ from one another — `That hook does not fire for that seat`, `when that seat started` — so the change is a rewrite of each rather than one substitution, on documents not read line by line here.
