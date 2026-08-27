---
id: 44bfc07e-d6c0-5aec-8543-b23d236093a8
page-type-slug: finding
title: "Shared ground ruling unfiled"
domain-slug: domain/global
---

# Claim

The infra ruling on shared ground stands only in a quarantined document queued for its own removal, so the sweep that empties `dirty/` takes it. It is paid-for: draining node-03 stranded node-pinned infrastructure that had never been enumerated and cascaded the fleet. Its non-obvious half is that the enumeration must cover everything rather than the pre-warned list. Nothing live carries it — `domains/infra.md` is a Definition bullet and nothing else — and no standing finding does either.

# Evidence

The ruling stands at `dirty/maybe-keep/skills/infra/SKILL.md` lines 8-12, kept verbatim by the seat that emptied `dirty/skills/infra/SKILL.md`: "Before pulling a shared resource, inventory what depends on it — everything, not only what was pre-warned. Maintenance and an incident are the same event seen from the estate; only the intent differs, and intent is not a mitigation. This is paid-for knowledge rather than caution: draining node-03 stranded node-pinned infrastructure that had never been enumerated, and cascaded the fleet."

That file also carries a composed `## Shared Ground` rule for `domains/infra.md`, and its filter-1 probe: `rg -l "nodeSelector|nodeName:|kubernetes.io/hostname"` over `packages/infra/k8s/` returns 23 files, `node-03` named in five, among them `k8s/electric/synth.ts` and `scripts/dr-runbook.sh`. The pinning the incident turned on is still there.

A thinner second copy stood at `dirty/skills/infra/rulings.md` lines 81-83; I removed it at commit `43de8e38f` while ingesting that source. It carried no incident and cited "the second Local Principle", which does not exist: `rg -uuu -U --multiline-dotall -in "Local Principle" domains/` returns nothing.

Nothing live carries the ruling. `domains/infra.md` is eleven lines — front matter and one Definition bullet — with no Design, Intent, Principles, Rules or Tasks. The near miss is `domains/role.md`'s Irreversibility, and the existing keep already parts them: a node drain is reversible, so that rule does not fire on it.

No standing finding covers it. `rg -uuu -il "node-03|shared ground|fault.injection|enumerate.{0,20}dependent|drain" findings/` returns ten files, all unrelated. `findings/infra/` holds twenty-five and none is this. Unrestricted form, the verdict being an absence.

Not established: whether the owner of `domains/infra.md` has seen the keep and declined it. An unpromoted keep and a refused one look the same from here.
