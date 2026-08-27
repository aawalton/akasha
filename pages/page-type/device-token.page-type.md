---
id: ba2692a2-fdbc-5dd0-995a-a70bddc028c8
page-type-slug: page-type
title: "Device token"
extends-slug: page
files: akasha:**/*.device-token.md
body-shape-slug: empty
slug: device-token
plural-slug: device-tokens
domain-parent-slug: domain/alanwalton-ios-notification
required-reading-slugs:
  - repo/memory-repo
---

# Definition

- **Device token** — where Apple delivers a push for one app on one device.

# Design

A token Apple rejects is dropped rather than kept.

One device holds a token for each app it runs.
