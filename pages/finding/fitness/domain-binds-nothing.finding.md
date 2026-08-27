---
id: ead91795-7a45-5ba7-b74a-a88c3f467bd6
slug: domain-binds-nothing
page-type-slug: finding
title: "Domain binds nothing"
domain-slug: domain/fitness
---

# Claim

`domains/fitness.md` binds nothing — it is a definition and no more — so every settled coaching judgment for the domain stands only in quarantined documents queued for removal, including Alan's dated ruling of 2026-07-27, "Notice, don't chase."

# Evidence

Measured 2026-08-07 while ingesting `dirty/skills/fitness/rulings.md`.

`domains/fitness.md` is ten lines whole: `domain-slug: fitness`, `domain-parents: health`, `persona-champion-slug: aelwyn`, `reviewed-at: 2026-08-05`, and a `# Definition` holding one bullet — "**Fitness** — the training Alan actually keeps." There is no `# Principles`, no `# Rules`, no `# Intent` and no `# Tasks`. Aelwyn owns it (`championed-domain: fitness` on `domains/personas/aelwyn.md`), and nothing it says tells her what to do.

The ruling, verbatim from the two documents that hold it, both under `dirty/`:

- `dirty/skills/fitness/rulings.md:24` — "Alan's ruling — *"notice, don't chase"* — is the third Local Principle, and it names a capability the domain does not have."
- `dirty/maybe-keep/skills/fitness/SKILL.md:205-206` — "*(Alan, 2026-07-27: "Notice, don't chase.")*", with the fuller form at :198, "A willpower stop is a clean stop, named kindly, not a failure. A stall is noticed and not chased", and at :202-203, "Noticing is free; nudging is not."

Nothing live carries it. `rg -uuu -in "don.t chase|notice, don"` — bare, with `--no-ignore --hidden`, over the whole instructions tree excluding `.git/` — returns exactly those two lines and no third. The same pattern over `~/memory` returns nothing. A seat that kept the `SKILL.md` copy independently searched `domains/` with `rg -Uin --multiline-dotall` for `nudg|chase|pressure|prompt him|push him` and recorded the two nearest live hits as binding something else: `domains/tasks/alan-harness/capture-time-tracking.md:35` is scoped to the hourly tracking question, and `domains/tasks/scenewright/author-persona-scene.md:59` is about agents rather than Alan.

Both carriers sit under `dirty/`. One is the source I am emptying; the other is a maybe-keep awaiting a promotion that may not come. Neither binds anyone today.

Not established: whether Alan still holds it, or how the domain should carry it.
