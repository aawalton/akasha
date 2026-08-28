---
page-type-slug: finding
slug: claude-md-pointers-outlive-their-targets
title: "Every CLAUDE.md pointer in the tree names a file this repository does not track"
domain-slug: repo/akasha-repo
---

# Claim

This repository tracks exactly one `CLAUDE.md`, at `infra/eso-rig/`. Sixteen comment pointers elsewhere name a `CLAUDE.md` that is not there, so every `CLAUDE.md` pointer in the tree except none at all dangles.

The population is pointers to `CLAUDE.md` specifically, tree-wide, at `229e7c5ea9` — not a claim about dangling citations generally, and not a claim about any other repository.

No target is recoverable. Each names either a path under a `packages/` tree this repository does not have, or a bare `CLAUDE.md` beside a file that has none, and nothing replaced what any of them pointed at. Two of the sixteen sit in generated files, where only the generator can be changed, and one of those generators carries the same dead pointer in its own source.

# Evidence

Measured 2026-08-28 at `229e7c5ea9` over the akasha checkout, which is the whole population — the code repository these were originally written in does not stand on this workstation.

`git ls-files '*CLAUDE.md'` returns one path, `infra/eso-rig/CLAUDE.md`. `git grep -l -F "CLAUDE.md"` returns 117 files and `-o` returns 238 lines, but 95 of the 117 stand under `pages/` — findings and prose about the problem rather than a comment sending a reader anywhere.

THE SIXTEEN, with what each names:

    dotfiles/Brewfile:2                                     CLAUDE.md
    dotfiles/Brewfile.macos:2                               CLAUDE.md
    dotfiles/Brewfile.macos:27                              CLAUDE.md
    dotfiles/etc-systemd-system/var-swap-swapfile.swap:13    this package's CLAUDE.md
    dotfiles/provision-macbook.sh:148                       CLAUDE.md
    dotfiles/setup-symlinks.sh:105                          packages/shared/dotfiles/CLAUDE.md
    infra/git-transport/hooks/post-receive:33               packages/infra/git/transport/CLAUDE.md
    infra/git-transport/hooks/pre-receive-main-append-only:22  ../CLAUDE.md
    infra/loki-service/synth-configs.ts:80                  ../CLAUDE.md
    infra/k8s/src/buildkit/buildkit.cluster-service.code.attachment.ts:51  CLAUDE.md
    temper/game-characters-equipment/src/sets/generated/temper-set.generated.ts:14  packages/temper/game/codec/CLAUDE.md
    temper/game-items-rules-core/src/use-destination-resolver.unit.test.ts:84  CLAUDE.md
    temper/shared-build-deploy-checks/src/addon-fingerprint-residue.manifest.ts:18  the addon CLAUDE.md
    temper/shared-build-deploy-checks/src/addon-fingerprint-residue.manifest.ts:23  the addon CLAUDE.md
    temper/shared-interface-hud-scene-catalog/src/generated/hud-scene-catalog.generated.ts:10  ../../CLAUDE.md
    tools/commands/eso/generate-hud-scene-catalog.ts:52     ../../CLAUDE.md

EVERY TARGET IS ABSENT, AND ONE TEST COVERS THEM ALL. Because `git ls-files '*CLAUDE.md'` returns exactly one path, and it is `infra/eso-rig/CLAUDE.md`, no relative or absolute form any of the sixteen spells can resolve. Each was also resolved and checked on its own: `dotfiles/CLAUDE.md`, `infra/CLAUDE.md`, `infra/git-transport/CLAUDE.md`, `tools/CLAUDE.md`, `temper/shared-interface-hud-scene-catalog/CLAUDE.md`, `infra/k8s/src/buildkit/CLAUDE.md`, `temper/game-items-rules-core/CLAUDE.md`, `packages/shared/dotfiles/CLAUDE.md`, `packages/infra/git/transport/CLAUDE.md` and `packages/temper/game/codec/CLAUDE.md` each return 0.

POSITIVE CONTROL ON THOSE ZEROS. `git ls-files` exits 0 when it matches nothing, so every zero here is a count of its output rather than its exit status. The same command against `pages/domain/page-storage.domain.md` returns 1.

THE TARGETS ARE ABSENT RATHER THAN UNSEEN. `CLAUDE.md` is not ignored — `git check-ignore -v` matches neither `dotfiles/CLAUDE.md` nor `temper/game-items-rules-core/CLAUDE.md` — and `git status --porcelain --ignored` shows no untracked `CLAUDE.md` anywhere on disk.

ONE POINTER IS WRITTEN TWICE. `tools/commands/eso/generate-hud-scene-catalog.ts:52` emits the comment that lands at `temper/shared-interface-hud-scene-catalog/src/generated/hud-scene-catalog.generated.ts:10`, and its `../../CLAUDE.md` is relative to where the generated file sits rather than to the generator. Repairing the generated file alone would be undone by the next generation.

WHAT IS EXCLUDED, AND WHY. Live code that handles or writes a `CLAUDE.md` rather than pointing at one: `infra/workspace-cli/src/lib/package-add/run.ts:49`, `infra/workspace-cli/src/lib/package-move/docs-rewrites.ts:16` and `:20`, and `tools/commands/package/add.ts:1`. A carrier label rather than a path, at `infra/cluster-checks/src/checks/check-properties-file-key-space.ts:131`. Test data in `infra/workspace-cli/src/lib/package-move/docs-rewrites.unit.test.ts` and `infra/cluster-checks/src/lib/lint-verdict-fold.unit.test.ts`, which is fixture strings rather than a comment sending a reader anywhere. Two further instances stand under `dirty/`, which is quarantined, and are left out on that ground: `dirty/aura-game-design/game-principles.md` and `dirty/my-faith/OVERVIEW.md`.

The one at `use-destination-resolver.unit.test.ts:84` is counted despite sitting in a test, because it is a sentence in a test's name directing a reader to a document rather than fixture data.

THIS SUPERSEDES AN EARLIER CENSUS. `claude-md-citations-all-dangle` was removed at `27cf77df`: it counted 412 files and 639 references under a `packages/` tree that holds 0 tracked files here, named a surviving fixture that returns 0, and rested on a ratchet at `infra/cluster-checks/src/lib/prose-mechanism-restatement.ratchet.json` that now reads `{"accepted": []}`. That is why this one states its population and its commit.

Not measured: whether the material any of the sixteen named survives anywhere reachable, so nothing here says what a right target would be. Not measured either: whether `infra/eso-rig/CLAUDE.md` is itself pointed at by anything.
