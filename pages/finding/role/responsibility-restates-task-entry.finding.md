---
id: e1cad0e8-4753-5cd7-b527-d699a7376894
page-type-slug: finding
title: "Responsibility restates task entry"
domain-slug: page-type/role
---

# Claim

The defect cut twice from `roles/lead.md` — a responsibility restating the trigger of its own task entry on the same surface — recurs on `roles/manager.md`.

# Evidence

`tools/document/schemas/role.ts` states the criterion twice: Responsibilities holds "what no task exhausts", and "what a task takes up in full is the section below it". Commits `60455cce` and `8561bcf3` cut two bullets from `roles/lead.md` on it.

`roles/manager.md`'s responsibility "Render the verdict on each child's hand-back" stands in the same relation to its own `verify-handback` entry as the two cut bullets did to theirs. `roles/archivist.md` is the corpus's clean model of the section: none of its four bullets maps onto one task.

This was one authoring habit rather than a set of separate faults, so it is expected on other role surfaces that have not been read.
