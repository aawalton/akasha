---
id: 48d470f3-13ca-4b42-ac9b-faa75124086c
page-type-slug: domain
title: "Claude Code session store"
slug: claude-code-session-store
domain-parent-slug: domain/claude-code-session
---

# Definition

- **Claude Code session store** — where session files are kept.

# Design

The store is `projects` under `CLAUDE_CONFIG_DIR`, or under `~/.claude` where that is unset.

Every account's store is one shared directory, made so here rather than by Claude Code.

A session is a file named for its id and a directory of that name beside it, which travel together.
