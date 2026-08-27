---
id: 77c65121-b39e-58c3-be76-e6f6a20a3dd7
slug: rulings-corpus-no-exit
page-type-slug: finding
title: "Rulings corpus no exit"
domain-slug: domain/ruling
---

# Claim

The rulings corpus has no exit: nothing removes a ruling once it stops being true, so every correct addition of doctrine to it is purely additive and pushes the corpus's cluster files further over their line caps.

# Evidence

Project #17159 (status someday_maybe, live-on commit, domain `ruling`). No objective was ever written; captured from the row's notes on 2026-08-15.

Three instances moved this from a data point to a diagnosis (Rule of Three): (1) `findings/check-reach-and-corpus-blindness.md`, the corpus's own finding; (2) `findings.md:263`, a slow-suite-gate ruling stale in both halves, nothing superseding it, read every lead cycle; (3) the rulings corpus itself: 662 lines, 25 rulings, one file, read at the top of every lead cycle, never had a ruling removed from it.

There is no `ops ruling` namespace at all; minting one is a lead's call, which is why #16927's manager escalated rather than absorbing it as a fifth child of that project.

A planned remediation — splitting the 662-line corpus into roughly nine clusters — was judged wrong: size is a symptom of there being no exit, and nine files with no exit would only grow, entrenching the carriers. The split must be sequenced after an exit exists, not before.

Design question left open: what makes a ruling stop being true — superseded by a later ruling, made unnecessary by a mechanism that now enforces it, or falsified — each a different fate for the text. The lossy exit taxonomy from findings (#16927) should not be copied across unexamined.

Measured overflow from #17156 (2026-07-29): relocating 24 rulings out of `active.md` into six clusters by subject pushed the caps to: authority 119→141, surfaces 188→239 (newly crosses; four others already over), rows 197→279, instruments 425→499, claims 503→558, measurement 662→737. No suppression was requested and no allowlist entry added. This is the fourth instance of the same evidence: a correct relocation of doctrine could only push five of six files further over cap, because there is no exit and every correct act is additive.
