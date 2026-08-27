---
id: eef83375-e854-5ad8-9e7e-2bb173275127
page-type-slug: finding
title: "Iterate page size bound restated"
domain-slug: domain/pages-system
---

# Claim

`iterate.ts` states its page-size ceiling twice and the two disagree: the header comment says `pageSize` is clamped to `[1, 1000]` while `MAX_PAGE_SIZE` eight lines below is 2500, so a caller reading the contract leaves more than half the admitted range unused.

# Evidence

`packages/shared/pages/access/src/iterate.ts:9-11` documents the argument as "`pageSize` is the size of each underlying `getPages` call (default 24, clamped to [1, 1000] so a single RPC chunk stays bounded even though `getPages` itself no longer caps `limit`)".

`:33` declares `const MAX_PAGE_SIZE = 2500`, and `clampPageSize` at :35-41 is the only thing that reads it: `if (n > MAX_PAGE_SIZE) return MAX_PAGE_SIZE`. So the live ceiling is 2500.

The two statements are eleven lines apart in one file, and the comment at :25-32 that sits between them records the change that made the first one false — "Per-request row ceiling. Raised 1000 -> 2500 (#13855) so a many-tiny-rows slug (`property-definition`, ~1.9k rows at ~153 B avg) loads its whole slice in ONE request instead of 4 sequential keyset pages on the cold-nav path." The raise was made and its rationale written down; the contract comment above the type was not moved with it.

What it costs is a caller who reads the contract rather than the constant. `clampPageSize` does not refuse an out-of-range request, it returns the bound — so a caller who trusts `[1, 1000]` and passes 1000 gets 1000 and never learns that 2500 was available, and a caller tuning a slow drain upward sees improvement stop at a number that matches neither statement. Both readings look correct from where the caller stands, because neither an error nor a warning distinguishes a clamped request from an honoured one.

The stale number is also the one a reader is likelier to reach. It sits on the exported type `StreamPagesArgs`, which is what an editor surfaces at the call site, where `MAX_PAGE_SIZE` is a module-private constant.
