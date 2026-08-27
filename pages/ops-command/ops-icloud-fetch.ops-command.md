---
id: 7225f0aa-56e2-54df-ae2f-738d8324b8ae
page-type-slug: ops-command
title: "Ops icloud fetch"
slug: ops-icloud-fetch
domain-parent-slug: domain/ops-icloud
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/icloud/fetch.ts
path: icloud fetch
---

# Definition

- **Ops icloud fetch** — every original photo in an iCloud shared album, downloaded to a directory.

# Help

Download every original photo from an Apple iCloud shared album (share.icloud.com/photos/<token>) to disk and print the written paths. Resolves the album's anonymous CloudKit access, pages through every photo, and writes each original resource (HEIC/JPEG as stored). No Apple account or credentials required — the share link alone grants read access.
