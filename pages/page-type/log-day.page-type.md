---
page-type-slug: page-type
title: "Log day"
id: 01a03aed-0b1f-7001-8e79-ef13bcb7b183
extends-slug: page
files: memory:**/*.log-day.md
body-shape-slug: empty
slug: log-day
plural-slug: log-days
domain-parent-slug: page-type/log-source
mortal: true
named-for: "{source-slug}-{date}"
---

# Definition

- **Log day** — one day of one log.

# Design

A log day holds its lines beside it, rather than each on its own.

A log is rotated by taking its oldest days away.
