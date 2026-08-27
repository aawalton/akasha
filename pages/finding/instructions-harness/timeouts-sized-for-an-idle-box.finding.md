---
id: f5bd5992-7362-5ef9-9373-5012771b86a0
page-type-slug: finding
title: "Timeouts sized for an idle box"
domain-slug: domain/global
---

# Claim

A check in `run-checks` fails on a timeout that only expires when the workstation is busy, so a seat running checks during ordinary fleet activity is told a passing test failed. The failure reads identically to a real one, and re-running it on a quieter box is what makes it go away.

# Evidence

A seat building #19154 reported `ops instructions run-checks` exiting 1 on `ops migration list --full — the property names it refuses`, timing out at 5000ms, and reported it failing the same way on two consecutive runs — which it read as a real failure rather than a flake, and escalated rather than fixing.

Run alone on the same checkout minutes later:

    bun test tools/tests/ops-migration-list.test.ts
    6 pass, 0 fail, 14 expect() calls
    Ran 6 tests across 1 file. [2.48s]

Six tests in 2.48s against a single-test budget of 5000ms. The margin is real when nothing else is running and gone when several seats are working, which is the ordinary state of this workstation.

A second seat, landing the turn-end rule removal earlier the same day, reported `suite-runs` failing on its first post-landing run and passing on re-run, and attributed it to overlapping with other agents landing. Same shape, different suite.

Two seats spent a report on this. Neither could tell a loaded box from a broken test, because nothing in the output distinguishes them.
