---
id: fa6b349b-03bd-573c-a6d6-bdde1fbad080
slug: row-document-never-refreshed
page-type-slug: finding
title: "Row document never refreshed"
domain-slug: barred-meaning/project
---

# Claim

Stage 8 of the singleton-deploy task wakes the lead to verify from a row document that stages 2 through 7 have made stale, and nothing refreshes it.

# Evidence

Stage 1 writes the plan into `# Notes`, "which your lead verifies from". Stages 2 through 7 are exactly the work that makes that plan stale. Stage 8 wakes the lead and stops.

`domains/project.md`'s Current State binds how Notes is written, and nothing in this task triggers the write. No slice could show this: the defect is a missing ninth bullet rather than a wrong one.
