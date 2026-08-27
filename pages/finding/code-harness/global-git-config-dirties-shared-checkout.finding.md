---
id: 70fc8103-b4e3-5dac-980d-1da340647c82
slug: global-git-config-dirties-shared-checkout
page-type-slug: finding
title: "Global Git config dirties shared checkout"
domain-slug: domain/global
---

# Claim

Any `git config --global` run on this workstation dirties a tracked file in the shared `~/code` checkout that every deploy reads.

# Evidence

`~/.gitconfig` is a symlink to `/home/walton/code/packages/shared/dotfiles/.gitconfig`, and `git ls-files` confirms that path is tracked. So a global git config write does not land in a private dotfile; it edits the repository in place.

Found by the #18905 seat, which hit it exercising `packages/infra/k8s/ci-tools/prune-ci-storage-script.ts`. That script opens with `git config --global --add safe.directory "$REPO"` at line 76 — correct and harmless as root inside a pod, which is the only environment it was written for. Run on the workstation to verify pruner behaviour, it dirties the checkout. The deploy gate caught it and the seat cleared it by hand.

The pruner is the instance rather than the fault. Every agent on this workstation carries git, and any of them reaching for `git config --global` — to set an identity, a safe.directory, an editor — writes into the shared tree the next deploy reads, and the connection between the command and the dirty checkout is invisible at the moment it is run.

The seat deliberately did not change a deployed script's behaviour for a case it was never designed for. That was right: the script is correct where it runs, and the coupling is on this side.
