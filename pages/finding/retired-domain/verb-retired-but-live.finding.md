---
id: 177c07ef-cc21-5c45-8af8-fda48629ad2b
page-type-slug: finding
title: "Verb retired but live"
domain-slug: domain/global
---

# Claim

`domains/retired/verb.md` retires `verb` and names `command` as its replacement, but `verb` stands in thirteen places across nine live task documents and Alan used it himself in a commit subject today.

# Evidence

The record reads: "**Verb** — an `ops` subcommand; now written as command."

`verb` stands in thirteen places across nine live documents, counted on 2026-08-06: `tasks/lead/change-instructions.md`, `tasks/lead/define-definition.md` (three), `tasks/lead/verify-handback.md`, `tasks/archivist/review-instructions.md` (two), `tasks/archivist/ingest-instructions.md`, `tasks/alan-harness/capture-time-tracking.md` (two), `tasks/handler/handle-inbound.md`, `tasks/code-harness/review-check.md`, `tasks/projects/build-parent-deploy.md`.

Commit `e772a609`, landed by Alan today, is titled "prepare-interview: name the verb that lists domains, not the path key".

The prescribed replacement may also be lossy. In `ops instructions read`, `ops` is the command and `read` is the subcommand; a document that needs to distinguish the two loses the distinction by writing both as `command`.

Alan deleted `domains/retired/pass.md` and `domains/retired/sweep.md` on the same day, which is the same disposition this record may want.

Filed rather than swept, because whether the word is retired or the record is wrong is his call and not a plain-language one. Found during project #18012.
