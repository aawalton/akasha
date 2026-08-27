---
id: 1029124a-9875-5baa-b319-404bc74b3247
page-type-slug: alert
title: "Query hard ceiling exceeded"
slug: query-hard-ceiling-exceeded
domain-parent-slug: page-type/alert
domain: query-performance
summary: 'Statement running {{ $value | printf "%.0f" }}s (queryid {{ $labels.queryid }}, role {{ $labels.role }}) exceeds the 30s ceiling'
---

# Definition

- **Query hard ceiling exceeded** — a query has been running for longer than any query is allowed to.
