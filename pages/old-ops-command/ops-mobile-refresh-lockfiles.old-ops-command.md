---
id: 01a04c31-7b62-7000-9c4e-2f6b5a8d1e04
page-type-slug: old-ops-command
title: "Ops mobile refresh-lockfiles"
slug: ops-mobile-refresh-lockfiles
domain-parent-slug: domain/ops-mobile
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/mobile/refresh-lockfiles.ts
path: mobile refresh-lockfiles
irreversible: false
---

# Definition

- **Ops mobile refresh-lockfiles** — a native shell's dependencies resolved where they install, and locked beside its package.json.

# Design

A lockfile is resolved on the macbook, that being the machine whose npm installs it.

Which shells are covered is read off the app pages rather than listed here.

A resolution that lands nothing new says so rather than committing.

# Help

Resolve every iOS app's native-shell dependencies and commit the resulting `package-lock.json` beside each `package.json`. Runs `npm install --package-lock-only` ON THE MACBOOK, in a directory the run makes and deletes, because that is the machine whose npm and node actually install these packages at build time — a lockfile resolved on the workstation would describe a tree nothing compiles. Which apps are covered is read off `pages/ios-app/*.md`; every one stating a `native-shell-repo-path` is included, so a new app needs no change here. The tree it writes into is the repository each app page's `native-shell-repo-path` names, which is akasha. Lands every lockfile through `ops write`, naming the paths, a generated file being written by whatever generates it; prints nothing moved where npm resolves what already stands. Run it whenever a native shell's dependencies intentionally change — otherwise two builds of one commit can install different versions with nothing recording that they differ.
