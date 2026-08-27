---
id: 01a023f1-6d24-7000-b4c1-58e7a9f3c206
slug: errand-prose-blocks-path-removal
page-type-slug: finding
title: "A quoted path in a seat errand blocks that path's removal"
domain-slug: domain/agent-harness
---

# Claim

A seat's `errand` holds a teammate's message verbatim, and the `mentions` gate reads that prose as a reference. Any message quoting a path stops that path being removed until the errand rotates, so a document stands closed by every other measure with its file still on disk.

# Evidence

Measured 2026-08-22. A removal refused with `[mentions] 36172 file(s) checked — 1 mention(s) would be stranded`, naming line 11 of a seat page. That line is the `errand:` key, and its value is a cross-session message whose text happens to contain the path while reporting that the file stands.

Nothing on that seat page referenced the file as a relation. The gate is matching a path inside stored correspondence, which no reader would follow and no rename should repoint.

Two retries a few minutes apart both refused; the errand had not rotated between them, and it holds the message before the most recent one, so rotation is not on every message.

Not established: whether the gate excludes any field today, or whether `errand` is the only free-text key that carries arbitrary prose into a scanned document. The general shape — correspondence stored verbatim in a gated page — will recur wherever a message quotes a path that later goes.

Not repaired.
