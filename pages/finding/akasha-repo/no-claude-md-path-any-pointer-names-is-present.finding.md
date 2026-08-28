---
id: 3e62c8c8-6e71-5d47-812c-b89d914627ea
page-type-slug: finding
slug: no-claude-md-path-any-pointer-names-is-present
title: "No CLAUDE.md path any pointer names is present"
domain-slug: repo/akasha-repo
---

# Claim

None of the paths the sixteen `CLAUDE.md` pointers name is present, and none is merely ignored or untracked.

# Evidence

Measured 2026-08-28 at `229e7c5ea9`. `git ls-files '*CLAUDE.md'` returns exactly one path, `infra/eso-rig/CLAUDE.md`, so no relative or absolute form any of the sixteen spells can resolve. Each was also resolved and checked on its own: `dotfiles/CLAUDE.md`, `infra/CLAUDE.md`, `infra/git-transport/CLAUDE.md`, `tools/CLAUDE.md`, `temper/shared-interface-hud-scene-catalog/CLAUDE.md`, `infra/k8s/src/buildkit/CLAUDE.md`, `temper/game-items-rules-core/CLAUDE.md`, `packages/shared/dotfiles/CLAUDE.md`, `packages/infra/git/transport/CLAUDE.md` and `packages/temper/game/codec/CLAUDE.md` each return 0.

Positive control on those zeros. `git ls-files` exits 0 when it matches nothing, so every zero here is a count of its output rather than its exit status. The same command against `pages/domain/page-storage.domain.md` returns 1.

The targets are absent rather than unseen. `git check-ignore -v` matches neither `dotfiles/CLAUDE.md` nor `temper/game-items-rules-core/CLAUDE.md`, and `git status --porcelain --ignored` shows no untracked `CLAUDE.md` anywhere on disk.
