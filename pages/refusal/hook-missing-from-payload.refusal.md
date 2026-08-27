---
id: 10928ada-30a6-57f2-8bfc-2339b3734bc3
page-type-slug: refusal
title: "Hook missing from payload"
holes:
  - what
  - path
  - pids
---

# Refusal

{what} — registered by `settings/agents.json` and absent from {path}, which is what pid {pids} was launched with. That hook does not fire for that seat.

`settings/agents.json` already registered it when that seat started, so the launch order does not explain it.
