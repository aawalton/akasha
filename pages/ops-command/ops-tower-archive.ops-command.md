---
id: 3b98c982-29e1-5380-94ff-6a104be90c58
page-type-slug: ops-command
title: "Ops tower archive"
slug: ops-tower-archive
domain-parent-slug: domain/ops-tower
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/tower/archive.ts
path: tower archive
irreversible: true
---

# Definition

- **Ops tower archive** — every closed chapter outside the keep-window, published for readers then cut from the live file.

# Help

Archive every archivable chapter from a Tower display state file into the stories repository.

Reads + Zod-parses `state.json`, plans which closed chapters fall outside the keep-window, then for each (oldest first): composes the chapter page (and its parent story page where none stands yet) and lands it through the stories repo's write gate, and ONLY after that commit, atomically rewrites `state.json` to drop the chapter's beats and collapse its `chapters[]` entry to a reference naming the file. Land-before-trim (add-before-remove) and a staged-`.tmp` + rename(2) rewrite keep the live file safe under concurrent browser polls.

The pages land as files and nothing is written to the database. A chapter already standing byte-identical is left alone rather than rewritten.

Idempotent: re-running completes any partial trim.

--dry-run reports the plan (chapters, beat counts, word counts, the file each would land at) without writing.
