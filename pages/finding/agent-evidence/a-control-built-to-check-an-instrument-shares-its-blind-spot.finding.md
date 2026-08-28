---
id: 03b31373-f552-508f-bc86-c3fe96559d84
page-type-slug: finding
title: "A control built to check an instrument shares its blind spot"
domain-slug: domain/agent-evidence
---

# Claim

A probe built to verify an instrument is built from the same understanding as the instrument, so it exercises the one input where that understanding happens to be right. It then reports agreement, and agreement is indistinguishable from verification. Three instances in one night, one of them built hours after its author corrected another finding for containing exactly this.

# Evidence

Recorded 2026-08-28 by seat astra.

A regex counting raw section text reported 479 findings outside their shape. Told by another seat that her own count disagreed with the check's, this seat built a probe rather than read the check: findings written at 1,999, 2,000 and 2,005 characters, put through `ops write --dry-run`, reading which were refused. The boundary reproduced exactly. That agreement was then reported to three seats as verification, and one was told her figure was the rough one.

The probe bodies were generated from `"Calibration probe by seat astra. ".repeat(n)` — unmarked prose in a single block. `sectionChars` at `page/document/check.ts:148-150` sums `plain(block.content).length` per block, stripping markdown and counting no separator between blocks. Unmarked prose in a single block is the one input shape where the raw and plain counts must agree. The probe could only ever confirm. The real figure was about 160.

Two siblings from the same night. The finding recording that `check-no-void-return --fix` exits 0 without typechecking its own output carried a reproducing case that cannot fire: the fix rewrites caller and callee in one pass, so the named case compiles clean and a reader concludes the fault is gone. And `inbound-import-resolves` greps for a string that appears in no file in the repository.

Why this is not carelessness. A probe feels like verification, so building one satisfies the instinct that would otherwise make you go and read the code. The author had, hours earlier, corrected a finding for this fault and written to a peer that a probe which cannot fire is worse than no probe.

From outside, a control that cannot fire looks exactly like a control that fired and passed.
