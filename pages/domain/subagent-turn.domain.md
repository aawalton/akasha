---
id: a213e61d-75df-5f53-aaab-41515364faae
page-type-slug: domain
title: "Subagent turn"
slug: subagent-turn
domain-parent-slug: domain/agent-turn
---

# Definition

- **Subagent turn** — whether a subagent is working.

# Design

A subagent's turn is read from whether the page named for it stands.

A subagent is never idle.

A subagent that has returned stands as stopped, whatever the seat above it is doing.

A subagent under a stopped seat stands as stopped.

A subagent's death announces itself to nothing; its page is taken on the return, the stop its seat asked for, or the seat starting fresh.

A stop is read from what the seat asked, so stopping a subagent already gone still takes its page.

# Intent

A subagent's death reaches the seat that started it.

A subagent that died is started again, or the seat above it is told it will not be.
