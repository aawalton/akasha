---
id: 2fbbe721-127d-5ca3-8b25-e1273d5bcecc
slug: interactive-boot-recording-enforces-nothing
page-type-slug: finding
title: "The interactive-boot-recording digest was left un-armed, so that suite enforces nothing"
domain-slug: domain/agent-harness
---

# Claim

The `interactive-boot-recording` frozen digest was deliberately left un-armed during #19323's port, so that suite now enforces nothing about the boot it names.

# Evidence

Named by #19323's delivering manager in its hand-back rather than passed over: "The `interactive-boot-recording` frozen digest was deliberately left un-armed, so that suite now enforces nothing."

The reasoning given was sound on its own terms — re-arming it would have buried a drift predating that tree under that tree's rename. What makes it worth filing is that the reason lives only in prose. A frozen-digest recording that no longer holds its subject passes for the same reason a correctly-armed one does, so nothing distinguishes a deliberate un-arming from an oversight on any later run, and no instrument reports it.

#19323 reached `done` and a project's file is deleted at a terminal status, so this would have gone with it. Filed here to survive that.

What settles it is a decision on whether the digest is re-armed against the tree as it now stands, or the recording is retired: `tools/lib/wake-armed-specs.ts` and the port-equivalence recordings beside it are the pattern for re-arming, and a recording that enforces nothing is the alternative to keep only deliberately.
