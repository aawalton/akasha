---
id: b2ea40f3-fe1c-5dce-8758-509d00dd3bc8
page-type-slug: finding
title: "By construction unchecked invariants"
domain-slug: domain/global
---

# Claim

Correctness claims stated in prose and asserted to hold "by construction," duplicated across two or more sites in the code-harness with no mechanical check that the construction still produces them, are the unifying shape behind every instrument-reliability defect found on 2026-07-25, and habit rather than any control is what caught three of them.

# Evidence

Seeded by athena from #16258's neighbourhood, generalised from a night of findings on 2026-07-25.

Concrete instance: `decideDeadRecipientRouting` and the wake-watcher registry both assert in docstrings that send-deliverable equals watcher-revivable "by construction." #16258 narrows one side; both docstrings then silently go false, code still compiles, and nothing fails at send time — a message to a dead seat pends forever. #16258 was since constrained to narrow both sides from one source and update both docstrings together; that instance is handled, this row is the class.

The class: a correctness claim stated in prose, asserted by construction, duplicated across two or more sites, with no mechanical check the construction still produces it.

Named the night's unifying shape across six instruments: #16290 (fizz spec sound over a writer domain that excludes the offender), #16292 (FizzBee splitting an atomic envelope so specs pass vacuously), #16293 (wedge detector emits cleared at higher lag than wedged), #16296 (check verb exit status can't distinguish unfinished from failed), #16278 (derived timeout constant invalidated by a later change, unlinked), and this row's docstring pair.

Habit is not a control: three contaminations were caught only by routine (re-reading the pipeline row by SHA instead of trusting the notification; a probe that sets the export flag it queries). Three saves, three habits, zero controls.

Candidates, not decided: (a) inventory prose-asserted invariants like "by construction," "identical by," "guaranteed by" first; (b) make each checkable or delete it; (c) require a doc-asserted invariant naming two sites to reference a test exercising both; (d) require both sites derive from one source, as given to #16258. (a) first; population size decides check vs cleanup. Caution noted against over-building.

Project #16298, someday_maybe, domain code-harness. Captured, never formally defined; moved off the row's retired `notes` attribute 2026-08-15.
