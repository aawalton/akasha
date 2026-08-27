---
id: bb1319ea-d49e-5d25-8cdb-e4a1a23889aa
page-type-slug: domain
title: "Page storage uncommitted"
slug: page-storage-uncommitted
domain-parent-slug: domain/page-storage
---

# Definition

- **Page storage uncommitted** — a page property a page's files hold without committing.

# Design

Every write to a page's frontmatter is committed.

An uncommitted property is never required.

# Intent

An uncommitted property's value stands beside its page, named for it with `.md` replaced by `.uncommitted.yaml`.

An uncommitted rows property stands in `.<key>.uncommitted.jsonl` instead.

An uncommitted attachment stands in `.<key>.uncommitted.attachment.<extension>` instead.

An uncommitted file holds the same keys the page's frontmatter would.

A file its repo ignores is written without passing the write gate.

An uncommitted property is reached by the same query as any other, and by no query that reads a repo's history.

An uncommitted file goes when its page goes.
