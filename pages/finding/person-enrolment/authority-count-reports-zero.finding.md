---
id: 8a9ab06b-f56e-5403-a383-a4d8affbdfb9
page-type-slug: finding
title: "Authority count reports zero"
domain-slug: domain/person-enrolment
---

# Claim

`ops person enrol` reports `authorityGranted 0` on a run that writes every authority row it was given, so its own output says the grant failed while the grant stands. A caller trusting the number re-runs the verb or reports the enrolment incomplete, and neither act is warranted. The access counter on the same line is correct, which is what makes the zero read as a real result rather than a broken counter.

# Evidence

Enrolling Alan on 2026-08-10 passed four `--access` flags and five `--authority` flags. The verb printed `accessGranted 4` and `authorityGranted 0` beside `created true`.

Reading `person-authority` rows straight afterwards found all five present for his account — `page-schema`, `page-data`, `feature-request`, `feature-approval` and `domain`, each at target `*`. The person row was new on this run, so none of the five could have been standing beforehand and skipped as already-converged.

The four `person-access` rows landed too, matching the count the verb reported for them.
