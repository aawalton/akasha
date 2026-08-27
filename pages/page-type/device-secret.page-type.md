---
id: 06f1e4a6-659e-5a3a-9767-f6fe1d6c3ed3
page-type-slug: page-type
title: "Device secret"
extends-slug: page
files: akasha:**/*.device-secret.md
body-shape-slug: empty
slug: device-secret
plural-slug: device-secrets
domain-parent-slug: domain/person-identity
required-reading-slugs:
  - repo/memory-repo
---

# Definition

- **Device secret** — a secret one device signs in with.

# Design

The page holds the secret's hash, and the secret itself is shown once when it is minted.

Minting for a device that already has one replaces it.
