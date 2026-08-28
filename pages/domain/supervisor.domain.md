---
id: 5884e621-a40c-56ae-8d82-7987a3f198cb
page-type-slug: domain
title: "Supervisor"
slug: supervisor
domain-parent-slug: domain/agent-runtime
settled: true
---

# Definition

- **Supervisor** — the process that runs an agent in a seat.

# Design

A supervisor writes a seat page by running the writer, never by holding it in memory.

# Intent

A supervisor picks up new code in place, without a restart.
