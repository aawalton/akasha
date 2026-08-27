---
id: 38004e98-b686-5c08-8de1-498ec6af8e20
page-type-slug: finding
title: "Read write edit ungoverned"
domain-slug: domain/global
---

# Claim

`ops books read`, `write` and `edit` are governed by no `domains/ops-books.md` glob.

# Evidence

Reported by the review of `domains/ops-instructions.md` on 2026-08-15, found through its own boundary work. `domains/ops-books.md` declares `instructions-path: tools/commands/books/*.ts`, which reaches `seed` and `word-count`; the three above forward to files directly under `tools/` that declare `books` in `repos:`. The reviewer treated it as another domain's boundary and did not repair it. Not re-checked here.
