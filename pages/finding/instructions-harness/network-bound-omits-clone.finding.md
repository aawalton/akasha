---
id: 869aa00d-6120-5f01-b4fa-d36219d76065
slug: network-bound-omits-clone
page-type-slug: finding
title: "Network bound omits clone"
domain-slug: domain/global
---

# Claim

`tools/lib/git.ts` bounds three network subcommands and omits `clone` and `pull`, while its header states that bounding by operation is what keeps a call added later from acquiring the hang. A call site added later that clones or pulls would hang unbounded, which is the case the header says cannot happen.

# Evidence

`tools/lib/git.ts:16` declares the bounded set: `const NETWORK_SUBCOMMANDS = new Set(["push", "fetch", "ls-remote"])`. `gitBytes` at line 31 tests membership and applies `timeout: 10_000` at line 36 only on a hit.

The header above it, lines 26-28, states the intent: "Git sets no connect timeout for HTTP, so an address that is routable but dead waits indefinitely rather than failing. Bounding by operation is what keeps a call added later from acquiring the hang by forgetting an argument."

`clone` and `pull` both reach the network and are both absent from the set, so for those two the stated property does not hold. The gap is invisible in the ordinary direction: a reader checking whether this helper is safe finds a set, a timeout and a header arguing for exactly the discipline they were looking for.

Latent rather than firing today. Searching `tools/` for `clone` returns one hit, `run-gates.ts:13`, which is prose about a seat's mistake rather than an operation; no tool under `tools/` clones or pulls.

That it is reachable is not hypothetical. `packages/agents/instructions/src/instructions/restore.ts` cloned through the same shared helper until `c0af9c4ae0` deleted it, and its own documentation named the resulting hang as the instrument's outstanding defect, expecting it to be fixed by inheritance: "The clone spawns through this package's shared `git()` helper, so it inherits a timeout as soon as that helper carries one." The helper later acquired one, and the inheritance the note predicted would not have covered a clone.

Found while ingesting `dirty/code/packages-agents-instructions-docs-restore-drill.md`, which is being emptied — so that note is about to stop existing, and with it the only record that this call shape was ever tried.

Searched `~/memory/findings/` for `NETWORK_SUBCOMMANDS|timeout.*clone|clone.*timeout|unbounded.*git`; nothing matched.
