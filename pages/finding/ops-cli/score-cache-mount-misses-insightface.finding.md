---
id: 0705cd3e-5d06-59b2-a174-cdccf43a608a
slug: score-cache-mount-misses-insightface
page-type-slug: finding
title: "Score cache mount misses insightface"
domain-slug: domain/ops-cli
---

# Claim

`ops wan score` mounts a cache directory insightface never writes to, so the buffalo_l model set — about 275 MB — is downloaded again on every single run rather than once, as the verb intends.

# Evidence

Found 2026-08-13 by the seat moving the `wan` command bodies into the instructions repository, from two runs of the verb made to prove the move.

The body mounts `${WAN_HOME}/cache` at `/root/.cache` in the one-shot scoring container — `tools/commands/wan/score.ts:77`, inside the `podman run --rm` argument list at `score.ts:66-85`. A comment beside it in the pre-move body stated the intent plainly: "The HF cache volume is shared with the resident container so insightface's buffalo_l weights download once."

They do not download once. The scorer's own stderr names where it looks for them:

    find model: /root/.insightface/models/buffalo_l/w600k_r50.onnx recognition ['None', 3, 112, 112] 127.5 127.5

`/root/.insightface/` is not `/root/.cache/`, and nothing mounts it. The scorer is `infra/wan/bin/score-frames.py`, which builds insightface's `FaceAnalysis` at line 9. The container is `--rm`, so the download dies with it.

The evidence that it repeats is two runs of the same invocation minutes apart, one against the live tree and one against a worktree, both with the same `WAN_HOME`. Each wrote a full download progress bar to stderr, ending `100%|██████████| 281857/281857`. Had the first run populated a shared cache, the second would have found it.

Two things follow that are not the same size. The wasted transfer is about 275 MB per invocation, which matters for a verb meant to be run once per harvested clip. The other is that a mount stating an intent in a comment, and not carrying it, reads as settled to anyone who looks — the download is on stderr among the scorer's other diagnostics, where nothing distinguishes it from ordinary noise.

Filed rather than fixed: the fix is a changed mount, which stood in the code repository when this was read, and the move this was found during edited nothing there. The mount now stands here, at `tools/commands/wan/score.ts:77`.
