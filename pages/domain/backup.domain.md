---
id: 914ca6bf-7d0a-5bce-9489-46db454935a5
page-type-slug: domain
title: "Backup"
slug: backup
domain-parent-slug: domain/storage
---

# Definition

- **Backup** — a copy of what a store holds, kept apart from it.

# Design

A backup mirrors its store by default, so a deletion reaches the copy.

Backups of the database are thinned as they age, keeping fewer the further back they go.
