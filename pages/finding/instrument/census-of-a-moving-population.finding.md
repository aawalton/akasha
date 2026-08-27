---
id: 06ac1845-f2c0-5e26-920b-dd859a138413
slug: census-of-a-moving-population
page-type-slug: finding
title: "Census of a moving population"
domain-slug: domain/instrument
---

# Claim

A census of a corpus that turns over is read wrong in three ways, each of which looks identical to a right reading. The unit is derived from a name instead of read from the field that records the relation. The size is taken at one instant, so a fast-turning population reads exactly like a stuck one. And a corpus that both drains and fills is compared against a reading taken at a different phase of its cycle. Nothing under `pages/domain/` binds any of the three.

# Evidence

Three rulings of 2026-07-28, standing only in `dirty/skills/agent-harness/rulings/measurement.md`, which is quarantined and queued for removal. Filed together because one fact settles all three: each is a number taken over a population that was moving, and each was wrong in the flattering direction.

The unit. A concurrency census counted seats rather than parent rows and read 11, 12 and 13 against a true 7; counting every non-terminal parent instead read 21 against a true 9, two statuses spending no unit because neither has a manager. The ruling names the root cause of all four errors as one thing — deriving a relation instead of reading the field that records it.

The instant. Ten rows at one status, read as "nine with no manager", went to eight within the hour. The depth was real and the conclusion was not. Recorded by its own author as the error he had just finished correcting in someone else.

The phase. A post-triage trough of 177 became 294 within the hour as four trees dispatched and their workers filed — the desired pattern firing, not a defect. So a trough compares only against another trough, and what carries information is the fraction of one cycle's items closed by the next.

Machinery checked 2026-08-07, and its rot does not touch the judgment. The seat-naming specimen is falsified: the live head form is `${role}-${seq}` at `packages/agents/shared/agent-name-grammar.ts:315`, and `project` and `manage` are legacy aliases for `manager` at `agent-roles.ts:217-221`. Both statuses named are live in `PROJECT_STATUS_VALUES`.

Live search 2026-08-07, `/usr/bin/grep -r` over `~/instructions/domains/` for `concurrency`, `queue depth`, `residence`, `trough` and `parent row`: nothing for any of the five. `domains/instrument.md` carries Population and Horizon; neither reaches a population that moves while it is read.

That corpus is now `pages/domain/`, and the reading holds there. Ripgrep over `pages/domain/` and `pages/page-type/` on 2026-08-27 for `moving population`, `turnover`, `trough`, `queue depth`, `at one instant`, `phase of its cycle` and `concurrency` matched nothing. `pages/domain/instrument.domain.md` is where Population and Horizon stand now, still reaching neither a moving population nor a phase.
