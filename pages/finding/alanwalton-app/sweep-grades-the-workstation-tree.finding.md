---
id: 1a18aa69-e731-5a11-bec1-f6cf2fc04db1
page-type-slug: finding
title: "Sweep grades the workstation tree"
domain-slug: domain/alanwalton-app
---

# Claim

The sim sweep says it installs "the current `origin/main` shell", but the SPA bundle the three scenarios actually assert against is staged from the workstation's working tree, which nothing in the sweep checks for cleanliness.

# Evidence

`sweep.ts:226` runs `["bun", "ops", "mobile", "sim", "install", "--app", app.slug]` and passes nothing else. `install.ts:83` calls `stageWwwFromWorkingTree(app, repoRoot)`, and its own help says the verb "Stages the SPA www/ FRESH on the workstation from the current WORKING TREE (not origin/main — the sim verifies a pre-land fix)". Only the native side is pinned: `build-sim.sh` does `git ff-only origin/main` on the mac. `install` has no flag to stage from origin/main; `--skip-native-sync` drops the git step and leaves the working-tree staging in place.

The three scenarios are all web-side. The accessory-bar geometry assertion, the DisplayFrame chrome toggle and the readiness marker all live in the SPA bundle, so what the suite grades is the workstation working tree, not the landed commit.

Six live prose sites say origin/main: `sweep.ts:3`, its `help.description` at `:106`, the `--skip-install` flag description at `:141`, the log line at `:225` that prints "installing origin/main shell…", the nightly `mobile-sim-suite.service` unit description, and its `ExecStart` comment.

`sweep-window-guard.ts` guards the MAC checkout — `decideSweepSkip` holds the window on a dirty mac tree so `git merge --ff-only` cannot abort. There is no equivalent probe of the workstation checkout the bundle is built from, and the nightly systemd unit runs with `WorkingDirectory=%h/code`, the same tree Alan works in.

The consequence runs the dangerous way for the nightly, whose stated job is to be the backstop for shell-touching diffs that landed while the mac napped: it can grade uncommitted local work as though it were the landed commit, and the alert it fires or withholds names origin/main either way.

Not established: how often that tree is dirty at 03:20, or whether the working-tree staging was a deliberate choice for the sweep rather than inherited from the interactive pre-land use `install` was written for.
