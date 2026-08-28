---
id: 3a8f3549-49ec-541f-9741-e3f616639ed2
slug: restore-drill-deleted-silently
page-type-slug: finding
title: "Restore drill deleted silently"
domain-slug: repo/akasha-repo
---

# Claim

Nothing turns akasha's mirror back into a repository, and the code that would says so in its own words. The replication leg is built, hooked and pushed on every receive; the read leg is unwritten, untested, and absent from all 334 `ops` verbs. A backup never restored and no backup at all are indistinguishable until either is needed.

# Evidence

`infra/git-transport/src/repos.ts:38-42` gives akasha a mirror at `https://github.com/aawalton/akasha.git`, and `infra/git-transport/hooks/post-receive` pushes to it. The copy exists.

`infra/git-transport/synth-deployment/init-bare-repo.ts:46-65` holds the one cold clone: where `code.git` is missing or its HEAD unreadable, it clones `--bare` from the GitHub mirror. Akasha's block at `:234-240` does the opposite — "Akasha takes the workstation-authority treatment above unchanged", which is `git init --bare` where the store is absent, and never a clone. The reason stands at `:111-116`: the workstation is this tree's authority and the mirror is downstream of it, so "Restoring this store from that mirror is a separate leg and is deliberately not wired here." `:165` says it again. `:148-152` describes the missing leg exactly: "a clone is the only operation a restore needs."

`ops --help` lists 334 verbs. Fifteen match restore, recover, backup, clone, mirror, rebuild or drill by keyword, and every one is unrelated — voice cloning, ESO typings, a buy-rule duplicate. None restores a repository.

Correction to this finding's earlier evidence, which said the only clones in the tree are CI checkouts. Six generated deployments run an `init-code` container that clones `alan/akasha.git` from the in-cluster transport into `/app/repo` and installs it, and six apps run out of that tree (`alanwalton/web/generated/web-deployment.generated.yaml:213`). It runs on every cold pod start — but it clones the store a recovery would be recovering, so it exercises reach and not recovery.

The drill itself cannot be read from here. This history opens at `a1d265eda3fb3b5`, and the drill lived in the retired `code` repo, never imported; the completion notice for project #16610 records that it restored the instruction tree rather than this one.
