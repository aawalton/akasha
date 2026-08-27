---
id: 34246f66-5f49-5e02-8c71-e311b353a92f
slug: local-script-run-dirties-the-launcher
page-type-slug: finding
title: "Local script run dirties the launcher"
domain-slug: domain/global
---

# Claim

`~/.gitconfig` on this workstation is a symlink to `packages/shared/dotfiles/.gitconfig`, a tracked file inside `~/code`. So any script doing `git config --global` writes into the launcher checkout every deploy shares and blocks every deploy from the machine until cleared. Rendering a CI script and running it locally is the ordinary way to prove one works, and nothing in such a script says `$REPO` reaches a tracked file — inside a pod it does not.

# Evidence

MEASURED 2026-08-12:

    $ ls -la ~/.gitconfig
    lrwxrwxrwx. 1 walton walton 53 May 31 06:54 /home/walton/.gitconfig
      -> /home/walton/code/packages/shared/dotfiles/.gitconfig
    $ git -C ~/code ls-files --error-unmatch packages/shared/dotfiles/.gitconfig
    packages/shared/dotfiles/.gitconfig

THE CASE THAT RAISED IT. A seat building #18846 rendered `PRUNE_CI_STORAGE_SCRIPT` from `packages/infra/k8s/ci-tools/prune-ci-storage-script.ts` and ran it on the workstation, to establish that the reaping it was adding actually reaped. Line 76 of that body is:

    git config --global --add safe.directory "$REPO" 2>/dev/null || true

Three runs left three lines in the tracked file. `ops project deploy` refuses on a dirty `~/code`, so every deploy from this workstation was blocked — not just that seat's — until it was cleared.

THE LINE IS NOT WRONG. In a CI pod `/ci-storage/repo` is owned by uid 1000 while the pruner runs as root, and without the whitelist git's dubious-ownership guard rejects every operation below it. The script's own comment says so. The hazard is not in the script and cannot be seen from it: on the machine the script was written for, `--global` reaches a file no repository tracks.

THE GENERAL SHAPE. This is not particular to the pruner. Any script rendered from this repo and run on the workstation to prove it works, that touches global git config, lands in the same place. The exposure is the symlink, and it converts a local rehearsal — the correct instinct, and what a negative control asks for — into a machine-wide deploy block.

NOT CLAIMED: that the symlink is wrong, or that the remedy is to stop rendering scripts locally. Both may be right; this records only that the two combine into a failure whose cause is invisible from either side.
