---
id: 499f9a48-b8a3-5db3-9975-891eff2c11ea
slug: markdown-citations-outlive-the-quarantine
page-type-slug: finding
title: "Markdown citations outlive the quarantine"
domain-slug: repo/code-repo
---

# Claim

Tracked source files across the code repository cite markdown documents by path — 357 of them a `CLAUDE.md` and 528 a `docs/<name>.md` — while 26 markdown files survive in the whole repository, exactly one of which is a `CLAUDE.md` and none of which sits under any `docs/` directory.

# Evidence

Measured in `~/code` over tracked `*.ts` and `*.tsx` only. `rg -l` gave the candidate sets and each path was then confirmed with `git ls-files --error-unmatch`, so neither figure includes untracked files or build output: 357 files matching `CLAUDE\.md` and 528 matching `docs/[a-z0-9-]+\.md`, against 14,523 tracked TypeScript files.

What survives on the other side: `git ls-files "*.md"` returns 26 for the entire repository. `git ls-files "*docs/*.md"` returns 0. `git ls-files "*CLAUDE.md"` returns one, `packages/infra/checks/__fixtures__/no-readme/clean/CLAUDE.md`, a check fixture rather than a document anything cites. Commit `7205e28efd`, "quarantine every instruction surface into the instructions repository", moved them; they sit under `dirty/code/` in the instructions repo with separators flattened, where no registry resolves them by their old path.

A worked sample from emptying two of those quarantined documents: `rg -n "docs/403-rebind\.md|docs/account-selection\.md|package CLAUDE\.md"` over `packages/agents/oauth/src/` and `packages/agents/oauth-proxy/src/` returns sixteen citations in fourteen files, among them `oauth-types.ts:31`, `:38` and `:75`, `oauth-selection.ts:19` and `:247`, `oauth-db.ts:309` and `permission-denied.ts:19`. Some defer rather than restate: `reauth-shell.ts:6` gives the two-phase design as "see the package CLAUDE.md" before summarising it.

Three standing findings measure pieces of this — `code-repo/proc-contract-citations-unresolvable.md` (twelve files), `instructions-harness/quarantined-doc-cited-by-path.md` (two), and `code-repo/three-doctrine-names-dangle.md`, which names "a floor nothing had measured". This is that floor at repository scale rather than one cluster at a time.
