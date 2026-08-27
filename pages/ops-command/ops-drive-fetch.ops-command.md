---
id: f5c2e48c-ec50-5631-a4af-a7349ddbe16d
page-type-slug: ops-command
title: "Ops drive fetch"
slug: ops-drive-fetch
domain-parent-slug: domain/ops-drive
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/drive/fetch.ts
path: drive fetch
irreversible: true
---

# Definition

- **Ops drive fetch** — one of Alan's Drive files written to disk under the name Drive holds for it.

# Help

Download one of Alan's Google Drive files to disk by share URL or bare file id, and print the absolute path of the written file. Accepts every Drive URL shape (file/d/<id>, open?id=<id>, uc?export=download&id=<id>, docs.google.com/.../d/<id>) or a bare id. The on-disk filename is the file's Drive name. Native Google-format files (Docs/Sheets/Slides) have no binary bytes and are rejected — this read-only fetcher pulls uploaded files (images, PDFs, …). Requires the one-time consent from `ops drive auth login`.
