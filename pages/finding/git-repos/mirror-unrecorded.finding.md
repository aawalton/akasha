---
id: db6970cf-7c90-507d-a271-3611fec82c24
slug: mirror-unrecorded
page-type-slug: finding
title: "Mirror unrecorded"
domain-slug: domain/git-repos
---

# Claim

Every bare repo mirrors to GitHub on every push, and the corpus says so nowhere. The durability posture is one disk plus a branches-and-tags mirror that a force-push follows, and `git-repos` records only the disk.

# Evidence

`domains/git-repos.md` Design, after the reading of 2026-08-06: "The bare repositories sit on one disk." Verified against `packages/infra/git/transport/k8s/synth-deployment.ts` and `synth.ts` — `replicas: 1`, `strategy: Recreate`, a PVC bound to a static `local` PV on the Talos volume at `/var/mnt/git-transport` on node-03, which the synth itself calls the single authoritative live store.

What the corpus does not say, verified in `packages/infra/git/transport/hooks/post-receive`:

- line 58 — `push "$MIRROR_URL" --all --force --prune`
- line 64 — `push "$MIRROR_URL" --tags --force`
- lines 41-44 — a repo declaring no `mirror.url` is an ERROR, "a misconfiguration rather than a repo that opted out of mirroring", so the mirroring is universal rather than per-repo.

The mirror's scope is narrower than a backup. `packages/infra/git/mirror-probe/src/divergence.ts:39` records that the bare repo carried 3180 `refs/pipelines/*` the hook has never pushed. Heads and tags are the whole of what it undertakes to carry. An hourly `mirror-probe` watches divergence.

So a bad local force-push propagates to the mirror, and the mirror does not hold what the hook never sent.

This was not an oversight a reading could simply correct: the mirror hook landed 2026-07-27 and the Design line 2026-08-05, so the author wrote it with the mirror already in place. Recording the mirror's scope here is an Add that grows what every reader pays at boot, which `review-instructions` admits only where an instrument settles what it should say.

Raised by the `review-instructions` reading of `domains/git-repos.md` on 2026-08-06.
