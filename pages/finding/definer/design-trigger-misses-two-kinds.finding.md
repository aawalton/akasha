---
id: 3e7c33ce-e5de-50b1-a7da-2bac282ba6e4
slug: design-trigger-misses-two-kinds
page-type-slug: finding
title: "Design trigger misses two kinds"
domain-slug: role/definer
---

# Claim

The definer responsibility covering domain design and intent triggers on a decision alone, leaving two of Design's three kinds with no trigger.

# Evidence

Reported by the review of `domains/roles/definer.md` on 2026-08-16: the line triggers on "a decision or an end state neither records", where `domains/domain-design.md` declares three kinds — Departure, Absence and Constraint — of which only Departure is a decision. A definer whose work turns on an unrecorded Absence reads the line and finds their case unnamed. The reviewer did not widen it: `domains/role-responsibilities.md`'s Responsibility Change rule reserves a changed Responsibilities line to Alan, its carve-out reaching only a removal a dispatched review lands. Not re-checked here.
