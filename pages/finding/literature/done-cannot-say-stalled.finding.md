---
id: fa4e875e-42f8-55d2-96b4-28891ee910b5
slug: done-cannot-say-stalled
page-type-slug: finding
title: "Done cannot say stalled"
domain-slug: domain/literature
---

# Claim

Zadi's `gbww-reading` rows carry `done` as their only completion marker, and the faucet reading them high-waters, so a plan never started and a plan stalled after several readings both show zero. The domain exists on the diagnosis that Alan's trigger for the canon is dead, and nothing in the rig can tell a dead trigger from one that was working and stopped. Nothing else reads these rows — no check, no readout — so the blind spot is the whole instrument rather than a gap in it.

# Evidence

Measured on 2026-08-07 by reading the live source rather than the store.

`packages/alanwalton/zadi-points/src/page-types.ts` declares every property on the type:
`planKey`, `author`, `work`, `section`, `planYear`, `readingNumber`, `editionMarker` (all
seeded from the committed `GBWW_PLAN` and never user-edited), then `done`, `read`,
`reaction`, `insights`. There is no `startedAt`, no `progress` and no `status`. `done` is a
boolean, and its own comment names it "the faucet's completion marker".

`aggregate.ts` sums `10 x planYear` over rows with `done === true`; every other row
contributes 0, and its header says so — "An empty or all-undone row set sums to 0". The
worker writes that sum to Zadi's persona `totalPoints` through `decideTotalPointsWrite`,
and its own header states the ratchet: "HIGH-WATER, not exact materialize... the green-day
sum only ever rises". So the one number the domain produces is zero in both states and
cannot fall out of either.

`rg -n "gbww-reading|GBWW_READING_PAGE_TYPE_SLUG" --glob "*.ts" -l packages/` returns
exactly five files, all under `packages/alanwalton/zadi-points/src/`: the worker, the
subscriber, the seed script, the page types and the aggregate. `rg -i "gbww"` over
`packages/infra/checks/src/` returns nothing, so no check reads these rows. The faucet is
the only consumer.

Raised by an archivist seat emptying `dirty/skills/literature/SKILL.md`, which recorded the
same defect in its own words and whose surrounding counts I did not re-measure. That file
is queued for removal, which is why this is filed here.

Distinct from `pages/finding/collections/completion-markers-unfilled.finding.md`: that one measures the
`collection-template` family (`episode`, `car-trim`, `song`, `book`, `story-chapter`,
`collection`, `great-course`) for declared markers no row fills. `gbww-reading` is not in
that family and its defect is the opposite shape — the marker is filled correctly and
still cannot distinguish the two states that matter.

Not judged: whether the repair is a start timestamp on the row, a gap report over views,
or nothing at all.
