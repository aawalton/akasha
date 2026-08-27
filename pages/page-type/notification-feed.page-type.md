---
id: 1b87fe23-c0fc-5af0-bfaa-dd9aa5efe956
page-type-slug: page-type
title: "Notification feed"
extends-slug: page
files: akasha:**/*.notification-feed.md
body-shape-slug: empty
slug: notification-feed
plural-slug: notification-feeds
domain-parent-slug: page-type/notification
required-reading-slugs:
  - repo/memory-repo
named-for: "{person-slug}"
---

# Definition

- **Notification feed** — everything this system has pushed at one person.

# Design

A feed stands in the memory repository rather than beside the person's own document, so a push writes nothing into the instructions.

One person has one feed, whatever pushed at them.
