---
id: a157ee26-6498-4e28-898d-1ffe2797ac84
page-type-slug: domain
title: "Claude Code session store path"
slug: claude-code-session-store-path
domain-parent-slug: domain/claude-code-session-store
---

# Definition

- **Claude Code session store path** — where inside the store a session's file is kept.

# Design

A folder is named for a working directory resolved through its symlinks, each `/` written `-`.

A folder's name records where a session began; nothing reads it back, so a file opens from wherever it is put.

A folder outlives the directory it is named for, and nothing takes it away.

# Intent

Nothing here works out where a session's file is from a working directory.
