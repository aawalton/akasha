---
id: 0f39a545-1ee9-5c78-a282-8125165af002
slug: awen-glob-governs-a-quarter-of-what-it-did
page-type-slug: finding
title: "Awen glob governs a quarter of what it did"
domain-slug: domain/global
---

# Claim

`domains/folders/engine-core.md:10` declares `code-path: packages/alanwalton/awen/**`. It still resolves, because `awen/core/` survives, so no gate fires and nothing reports it. But the file set it governs fell from 347 to 103 on 2026-08-20 when the awen engine packages went. The domain now answers for `core/` alone, and will silently re-absorb `ingest/`, `engine/` and `src/` as Alan rebuilds them under the same glob.

# Evidence

Measured 2026-08-20 over git-tracked files only, so untracked and `dist/` trees cannot inflate it.

At `d65c63e859`, the last commit before the day's deletions, `packages/alanwalton/awen/**` matched 347 files: `ingest/` 153, `core/` 102, `src/` 76, `engine/` 14, plus `package.json` and `tsconfig.json`. At `6e52ffac6a` it matches 103, every one under `core/` — 245 files removed and 1 added to `core/`, a net fall of 244.

The deletions are correct and expected. Alan is rebuilding the awen engine from scratch and can reference source history, so nothing here says a file should come back.

What changed without being decided is the domain's reach. `Path Globs` on `page-types/domain.md` states that a glob governs everything it matches and that this carries onto every domain above — here `code-repo` and `narrative-engine`. The Definition of `engine-core` is "what every story-world runs on". That described the whole awen tree; it now describes one subdirectory, and the glob was not rewritten to say so.

The forward half is the larger one. The glob is a standing claim on any path under `awen/`, so each directory the rebuild adds — an ingest tree, an engine, a top-level `src/` — is absorbed into `engine-core` at creation, through no act that reads as a decision and with nothing reporting the widening.

Whether the glob should narrow to `packages/alanwalton/awen/core/**`, stay as it is, or move to another domain is a Design line on a domain document, which `Every Changed Line` makes Alan's. Filed rather than edited.
