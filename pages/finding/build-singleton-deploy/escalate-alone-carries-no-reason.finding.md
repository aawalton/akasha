---
id: 708c8acf-ec3b-58d4-bdae-420f9bc181a1
slug: escalate-alone-carries-no-reason
page-type-slug: finding
title: "Escalate alone carries no reason"
domain-slug: domain/global
---

# Claim

Stage 3's `Escalate` is the only one in the family carrying no reason. Five sibling escalate bullets each state why a foreign red is not the seat's to fix; this one states the act alone.

# Evidence

Measured 2026-08-06 across `domains/tasks/projects/build-*.md`.

The bare one, `build-singleton-deploy.md:31` — "**Escalate** a failure in what you did not touch rather than fixing it or working around it."

The five carrying a reason:

- `build-parent-commit.md:34` — "Other seats commit into this repository while you work, and their failure is not yours to fix or to return."
- `build-singleton-commit.md:28` — "Other seats commit into this repository while you work, so a check failing on a path you never touched is theirs."
- `build-parent-deploy.md:35` — "The branch carries whatever `main` was red with when it was cut, and that failure is neither yours to fix nor a child's to take back."
- `build-parent-deploy.md:57` and `build-singleton-deploy.md:51` — "Other seats commit into this repository while you work, and their failure is not yours to fix."

So the same document carries a reasoned escalate at line 51 and a bare one at line 31.

`build-parent-deploy.md:35` is the closest match in position — the branch-CI stage — and its reason is instrument-settled: a branch carries whatever `main` was red with when it was cut.

Filed rather than repaired: whether this reader needs the reason is judgment, not something an instrument answers. The reading noted that a bare instruction is obeyed but not transferred — a seat that cannot say why will not recognise the next case that fits it.

Weighing against: `domains/agent-harness.md` carries Cut The Obvious, and a reason a seat would infer anyway is the kind of line it says to leave out.
