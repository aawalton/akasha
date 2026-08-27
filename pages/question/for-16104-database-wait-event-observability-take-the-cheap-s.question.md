---
page-type-slug: question
id: 019f9b3b-d295-7317-b4d2-749899c2ffdd
title: "For #16104 (database wait-event observability): take the cheap sampled instrument now, or the correct one that needs a Postgres primary restart?"
slug: for-16104-database-wait-event-observability-take-the-cheap-s
status: answered
source-context: "019f93a6-67c0-7174-a75d-40ae007e92e4"
asked-by: 019eb8d9-abdd-7890-b2cb-ec3e9dbd8b19
options:
  - "A — cheap sampled now"
  - "B — pg_wait_sampling, accept the restart"
  - "A now, B later only if sampling proves too coarse"
answered-at: 2026-07-25T21:44:01.495Z
---
A now, B later only if sampling proves too coarse
