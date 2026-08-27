---
id: 2d6db085-e4b1-580e-b8e1-06211297cf7f
slug: reference-manifest-collides-on-every-pair
page-type-slug: finding
title: "Reference manifest collides on every pair"
domain-slug: domain/global
---

# Claim

Any two projects that both retake render-harness references collide in the merge queue on `references/alanwalton/manifest.json`, because `--bless` rewrites its timestamp whether or not a pixel moved.

# Evidence

Projects 18432 and 18433 ran in parallel on 2026-08-10 over the same widget sources and the same reference directory, deliberately: neither needed the other's result, and they were told to take the minute rather than wait if they collided on a file. They did not collide on any drawing. They collided on the manifest, and the merge queue ejected 18433's branch twice over it.

The conflict is not a real disagreement about content. `--bless` stamps the manifest on every run, so a project that reblesses a single image writes the same field as a project that reblesses forty, and two branches that touched entirely different tiles arrive with two different timestamps in one line. 18433 resolved it by leaving the manifest exactly as 18432 had blessed it, which is correct and which also means the timestamp now describes neither run.

What makes this worth writing down rather than absorbing: the cost falls on whoever lands second, it falls in the merge queue rather than at the seat, and it is invisible to everything upstream. Branch CI passes on both. The drawings do not conflict. Nothing in either project's criteria reaches it. So each pair of parallel readout projects rediscovers it, pays the ejections, and resolves it by hand.

It will recur on the next pair. Parallel dispatch over one reference directory is the ordinary shape of this work — Alan gives corrections in batches, and a batch is several projects touching several tiles — so this is a standing property of how readout work is dispatched rather than an accident of these two.

What has NOT been established: whether the timestamp is read by anything. If nothing consumes it, the field is the whole of the problem and can go; if something does, the fix is elsewhere. That reading is what a decision here needs and it has not been taken.
