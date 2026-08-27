---
id: 406e8235-c8ba-5f45-8b47-d020ae382ee1
slug: live-data-check-reds-the-fleet
page-type-slug: finding
title: "Live data check reds the fleet"
domain-slug: domain/global
---

# Claim

A branch check that reads live production data has no reproducible verdict: another row's
mid-flight deploy moves the data underneath every branch at once, and every branch reds on a
step it never touched.

# Evidence

Measured 2026-08-04 between 19:36 and 19:55 UTC, on main tip e66af34b3877aa11803fe47fb494aa979011ee1c.

`check-status-vocabulary-drift` compares `PROJECT_STATUS_VALUES` in the branch's source
against the select options on the deployed `property-definition` row
019db533-f3a2-7c8a-ab61-3834077df8e6, read live via `@shared/pages-access`. It asserts
source is a subset of deployed.

Row #17806 narrows that vocabulary from 22 values to 19. Its data contraction was written at
19:36:30; its source narrowing had not landed at 19:55, and origin/project-17806 was not an
ancestor of origin/main. In that window main's source held 22 against a deployed 19, so the
check failed on a clean checkout of the main tip with three violations — `plan`, `testing`,
`verification_plan` — with no branch touching any of them. Row #17816 was stopped by it at
`checks`, having run the check in a clean checkout with none of its own files present and
reproduced the same three violations and the same exit 1.

One of the check's two inputs is not in the branch, so it cannot separate a defect in the
branch under test from a defect in the estate around it. Its own remediation text offers both
readings — "the ROW moved" or "the SOURCE moved" — and leaves the seat to pick, on evidence
the check did not gather.

The same run printed `[POPULATION NOT DECLARED]`.

NOT MEASURED. How many of the 177 checks read live production state rather than the
repository; `check-retired-status-vocabulary` and the ESO and liveness checks are candidates,
and no field on `CheckConfig` distinguishes them. How long the window stayed open, #17806 not
having landed when this was filed. Whether any task surface states which of the two acts a
narrowing lands first.
