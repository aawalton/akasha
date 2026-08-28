---
id: 28ac5f5e-b8d9-5960-bc3d-5dcd97709e6d
slug: land-ts-stands-sixty-one-bytes-under-its-length-ceiling
page-type-slug: finding
title: "Land ts stands sixty-one bytes under its length ceiling"
domain-slug: domain/pages-system
---

# Claim

`repo/land/land.ts` stands at 14,939 bytes against the 15,000-byte ceiling the write gate enforces, leaving 61 bytes. The next change to it is refused on length before it is judged on merit, and nothing says so until the refusal arrives mid-change.

# Evidence

Met 2026-08-27 while adding a refusal message to `landFiles`. The first version added 1,452 bytes and was refused:

    file-length: /var/home/walton/repos/akasha/repo/land/land.ts — 16,013 bytes, over the 15,000 ceiling

The change had to be cut to 378 bytes to land. What was cut was the doc comment explaining why the branch exists, which is the house style everywhere else in that file — `roots.ts`, `gate.ts` and `land.ts` itself all carry one over a departure a reader would not guess. The comment is what a ceiling squeezes out first, and it is the part that stops the next reader undoing the change.

Before that change the file was 14,561 bytes, so the headroom was 439 and is now 61.

`land.ts` is load-bearing rather than incidental. It is the only path by which `ops write` puts a body on disk, unlinks a removal and commits, and it holds `landFiles`, `land`, `landOutside` and `removeOutside` together.

The fix is to move code out rather than to raise the ceiling. `partlyApplied`, the message builder inlined at the failing commit, wants a module of its own beside `landing.ts`. So do `landOutside` and `removeOutside`, which serve paths inside no repository and share nothing with the gated path but `put`.

Not established: how many other files in this repository stand within a few hundred bytes of the same ceiling. Nothing reports headroom; a writer learns it from the refusal.
