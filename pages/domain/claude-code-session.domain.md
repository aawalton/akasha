---
id: 054eb10f-465b-4d68-bc68-430b46b7301a
page-type-slug: domain
title: "Claude Code session"
slug: claude-code-session
domain-parent-slug: domain/claude-code
required-reading-slugs:
  - page-type/agent
---

# Definition

- **Claude Code session** — one conversation Claude Code can pick up again.

# Design

A session is one agent: its id changes when the agent does, and never otherwise.

A session is found by its id, not by where its file is kept.

Each line of a session records the working directory it was written under, and the session itself records none.

Moving a live session's file makes the writer open a new one at the old path, holding only what came after.
