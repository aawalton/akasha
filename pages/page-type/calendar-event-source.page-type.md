---
page-type-slug: page-type
title: "Calendar event source"
id: 019e9cb1-f585-7934-bd7a-07be06a2061d
extends-slug: page
files: memory:**/*.calendar-event-source.md
body-shape-slug: empty
named-for: "{external-id}"
slug: calendar-event-source
domain-parent-slug: page-type/calendar-event
required-reading-slugs:
  - repo/memory-repo
---

# Definition

- **Calendar event source** — somewhere else's calendar, read for the events it publishes.

# Design

A source's events are read whole on every pass, and the source states nothing about what changed since the last one.
