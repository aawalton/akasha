---
id: 019ffe91-4c22-7a30-b5f1-6d3a7c4e8b02
page-type-slug: workstation-service
title: "Sweep page answers"
slug: sweep-page-answers
domain-parent-slug: page-type/workstation-service
runs:
  - bun services/sweep-page-answers.ts
enabled: true
schedule: "*-*-* *:23:00"
jitter-seconds: 60
catch-up: true
start-timeout-seconds: 600
---

# Definition

- **Sweep page answers** — the service that takes away a kept page answer once it has stood for a day.

# Design

Answers from different states stand together, so nothing in the writing path takes an old one away.

How long an answer has stood is read from the file, because an answer names the state it came from rather than when that state was current.

An answer still wanted is worked out again on the next miss, which costs one compile and changes no result.

A sweep that deletes nothing says nothing.
