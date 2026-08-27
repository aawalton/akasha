---
id: 26c2b3ed-61f9-50a4-96fa-7c9c2b1eb62d
page-type-slug: workstation-service
title: "APNs push notifier"
slug: apns-push-notifier
domain-parent-slug: domain/alanwalton-ios-notification
required-reading-slugs:
  - page-type/workstation-service
runs:
  - bun services/apns-push-notifier.ts
enabled: true
restart-delay-seconds: 10
---

# Definition

- **APNs push notifier** — the service that puts each notification written for Alan on his devices.

# Design

Nothing is sent while `APNS_AUTH_KEY_P8` is unset, and the feed is followed anyway.

A push is claimed before it is sent, so a notification read twice is pushed once.

A start begins at the newest notification already standing rather than at the head of the feed.

A badge is refreshed on its own only when the count of open questions fell.

# Intent

The service runs.
