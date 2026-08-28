---
page-type-slug: finding
slug: claude-md-pointers-outlive-their-targets
title: "Every CLAUDE.md pointer in the tree names a file this repository does not track"
domain-slug: repo/akasha-repo
---

# Claim

This repository tracks exactly one `CLAUDE.md`, at `infra/eso-rig/`, and sixteen comment pointers elsewhere name a `CLAUDE.md` that is not there.

# Evidence

Measured 2026-08-28 at `229e7c5ea9` over the akasha checkout, which is the whole population: the code repository these were originally written in does not stand on this workstation. The population is pointers to `CLAUDE.md` specifically, tree-wide.

`git ls-files '*CLAUDE.md'` returns one path, `infra/eso-rig/CLAUDE.md`. `git grep -l -F "CLAUDE.md"` returns 117 files and `-o` returns 238 lines, 95 of the 117 under `pages/` — prose about the problem rather than a comment sending a reader anywhere.

THE SIXTEEN, with what each names:

    dotfiles/Brewfile:2  CLAUDE.md
    dotfiles/Brewfile.macos:2  CLAUDE.md
    dotfiles/Brewfile.macos:27  CLAUDE.md
    dotfiles/etc-systemd-system/var-swap-swapfile.swap:13  this package's CLAUDE.md
    dotfiles/provision-macbook.sh:148  CLAUDE.md
    dotfiles/setup-symlinks.sh:105  packages/shared/dotfiles/CLAUDE.md
    infra/git-transport/hooks/post-receive:33  packages/infra/git/transport/CLAUDE.md
    infra/git-transport/hooks/pre-receive-main-append-only:22  ../CLAUDE.md
    infra/loki-service/synth-configs.ts:80  ../CLAUDE.md
    infra/k8s/src/buildkit/buildkit.cluster-service.code.attachment.ts:51  CLAUDE.md
    temper/game-characters-equipment/src/sets/generated/temper-set.generated.ts:14  packages/temper/game/codec/CLAUDE.md
    temper/game-items-rules-core/src/use-destination-resolver.unit.test.ts:84  CLAUDE.md
    temper/shared-build-deploy-checks/src/addon-fingerprint-residue.manifest.ts:18  the addon CLAUDE.md
    temper/shared-build-deploy-checks/src/addon-fingerprint-residue.manifest.ts:23  the addon CLAUDE.md
    temper/shared-interface-hud-scene-catalog/src/generated/hud-scene-catalog.generated.ts:10  ../../CLAUDE.md
    tools/commands/eso/generate-hud-scene-catalog.ts:52  ../../CLAUDE.md

Not measured: whether the material any of the sixteen named survives anywhere reachable, or whether `infra/eso-rig/CLAUDE.md` is itself pointed at by anything.
