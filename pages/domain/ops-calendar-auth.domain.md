---
id: e385d02c-ab02-5b41-a30f-9efdbe1bd93c
page-type-slug: domain
title: "Ops calendar auth"
slug: ops-calendar-auth
domain-parent-slug: domain/ops-calendar
required-reading-slugs:
  - domain/ops-namespace
  - domain/secret
---

# Definition

- **Ops calendar auth** — the one command that mints the calendar refresh token, by consent as Alan.

# Design

Consent runs against the Gmail OAuth app rather than a calendar app of its own.

The refresh token is printed for `~/.secrets.env`, never written anywhere.
