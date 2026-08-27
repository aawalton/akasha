---
id: e53f82a0-6479-5e67-9c98-af99c6d62607
page-type-slug: finding
title: "Parent edge under fitness"
domain-slug: domain/medicine
---

# Claim

`domains/medicine.md` declares `domain-parents: fitness`, which makes medicine a child of training. Every other account of the estate places it beside fitness, food and sleep as a peer under `health`.

# Evidence

`domains/medicine.md` line 3 reads `domain-parents: fitness`. `domains/fitness.md` line 10 reads `- **Fitness** — the training Alan actually keeps.`, so the declared parent's material is training and medicine's is not a kind of it.

`ops instructions dag --domain health` prints `fitness` with `medicine` as its only child, so medicine has no siblings at all under the current edge.

Against that, `dirty/skills/medicine/SKILL.md` line 38 calls fitness *"the neighbouring fitness domain"* and line 170 *"the neighbouring domain that owns training"* — neighbouring, not parent. Line 15 of the same file lists `fitness`, `food` and `sleep` together as peer lanes whose ledgers medicine must not duplicate. `dirty/skills/persona-craft/economy-decisions-health.md` line 47 reads *"Elaine — medicine, contributing to Health"*. Every peer named there — `fitness`, `food`, `sleep`, `style`, `arousal` — declares `domain-parents: health`.

The standing definition carried the edge's cost on its face: `- **Medicine** — the care Alan's body needs beyond training: what he takes and what he is treated for.` needed "beyond training" to carve itself out of its own parent. That phrase went when Alan approved the plainer line on 2026-08-06 (`bb9fe3f7`), so the file now declares the edge and no longer shows the strain of it.

Not verified: that `health` is the right parent. The `dirty/` surfaces all carry `domain-parents: global` from the old flat skill layout, so they are evidence about who medicine's neighbours are and no evidence about hierarchy.
