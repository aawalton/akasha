---
id: 5c037bbd-fd20-5701-ac8f-4c6aff21486f
slug: rulings-absent-beside-the-gaps
page-type-slug: finding
title: "Rulings absent beside the gaps"
domain-slug: domain/chess
---

# Claim

The chess corpus in memory holds five findings, every one an unclosed gap in the machinery, and none of the four standing rulings that say what to do about them. Two of the five report the exact state Alan already ruled on — he declined one instrument and deprioritized the other producer — so read as filed they ask a lead to do what he decided against.

# Evidence

Read 2026-08-07 while emptying `dirty/skills/chess/rulings.md`.

`findings/chess/` holds five: `faucet-zero-is-unreadable`, `game-record-lives-outside-version-control`, `progress-rows-have-no-code`, `studied-path-has-no-producer`, `value-axis-says-fun-and-learn`. Each is a correct, measured observation of something missing. `rg -uuu -iln "ruling|declined|deprioritized" findings/chess/ findings/erin/` returns nothing.

Two meet a ruling head-on. `faucet-zero-is-unreadable` reports that "no instrument parts a student who is not practising from practice that nothing recorded" — Alan was asked whether practice should be recorded at all and said to leave the gap, so the domain cannot tell idle from unrecorded by decision. `studied-path-has-no-producer` reports four surfaces ready for a signal nothing emits — Alan wants that producer and ranked it low, so they are a rail waiting on its last piece rather than debris. Both rulings are now quarantined at `dirty/maybe-keep/skills/chess/rulings.md` and bind nobody; the findings are live.

Two more rulings sit there with no counterpart here: that the tooling is not the blocker, and that what the domain waits on is Alan's first session with Erin. All five rails are live — `ops chess evaluate` returns +0.49 at depth 18, 22 `chess-game` rows all `source = corpus`, 5,000 `chess-puzzle` rows, three subscriptions at `subscriber.ts:72-74`, board components under `packages/alanwalton/web/app/chess/`. A lead meeting five machinery findings and no ruling has every reason to build and none to wait.

This is structural, not a fault in any of the five. `domains/finding.md` defines a finding as "a single observation about a domain, filed before anyone has judged what it means", and each is exactly that. The gap is that the judgments exist, were reached by Alan, and have nowhere here to stand.

NOT MEASURED: whether any seat has acted on one of the five.
