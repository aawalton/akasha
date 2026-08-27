---
id: 1f8bb7a3-7e65-511f-97f0-a22f447dd61b
page-type-slug: domain
title: "Ops calendar"
slug: ops-calendar
domain-parent-slug: domain/ops-cli
required-reading-slugs:
  - domain/ops-namespace
  - page-type/calendar-event
---

# Definition

- **Ops calendar** — the commands that read and write calendar events, Alan's through Google and other people's as pages.

# Design

Every command but `auth login` answers with one JSON document on stdout.

The events other people publish are fetched and filed by the sync that runs on a schedule, and no command here reaches them.

`--calendar` is optional on every command that names one, and leaving it out is the same as passing `primary`.
