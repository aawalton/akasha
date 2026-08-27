---
id: 12f31712-3fa8-5dcc-b014-262d07ecea06
slug: live-project-seats-state-no-project
page-type-slug: finding
title: "Two live seats are working projects while stating no project assignment"
domain-slug: domain/seat-assignment
---

# Claim

Two live seats are working projects while stating no project assignment, so the first Intent line of `domains/seat-assignment.md` — "Every assignment but `errand` is stated on the seat" — does not hold, after #19416 removed the thing that had made stating a project impossible.

# Evidence

Observed on this workstation at 20:50 on 2026-08-18 by `aine`, verifying #19416's hand-back, and read directly rather than relayed.

The two seats are `readout-system-developer-build-singleton-deploy-19417` (`01a01681-34a7-7093-a659-be951922cf86`) and `seat-name-developer-build-singleton-deploy-19418` (`01a01687-ad0a-7c77-b0ed-b47741bd2b73`). Both were live in tmux and both read `live` from `ops seat list --all`.

Their attribute buckets under `~/.instruction-seats/<id>.json` carry `"pushed":"claude|readout-system|developer|build-singleton-deploy||"` and `"pushed":"claude|seat-name|developer|build-singleton-deploy||"`. The fifth field is the project slot and is empty in both. `bun tools/seat.ts --show --agent <id>` reads `project — none stated` for each, and `initiative — none stated` and `on-call — none stated` beside it.

The seq each carries in its name is the retired tail spelling that #19416 replaced, not a stated assignment: `bun tools/seat.ts --name` composes the seq at the head now, and neither seat has restated since the deploy. For contrast, #19416's own seat carries `claude|seat-assignment|developer|build-singleton-deploy|19416|agent`, with the slot filled.

#19416's hand-back notes claim of these two that "their rows state their seqs". That claim is what this finding contradicts.

Not measured: whether either seat restates its project when it next states anything, and how many stopped seats hold the same gap.
