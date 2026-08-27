---
id: 46e0b5e9-2a32-5d11-abb6-511da963715d
slug: port-task-import-precondition-unenforced
page-type-slug: finding
title: "Port task import precondition unenforced"
domain-slug: domain/agent-harness
---

# Claim

The `port-supervisor-file` Tasks bullet states a precondition — "once everything it imports already stands here" — that nothing enforces and the task itself does not repeat.

# Evidence

Reported by the review of `domains/agent-harness.md` on 2026-08-15: the instructions repository imports code-repository modules freely (the reviewer counted 980 distinct references across 1522 files), so an import standing in the code repository is not a bar to porting; and the task's stage 2 makes movability what the typecheck answers, naming no ordering over imports. Those counts were not re-measured here. Whether the bullet records a queue policy somebody holds, or is simply wrong, was not judged.
