---
id: b0ca5d6a-3bdc-597f-b113-28883100818e
slug: composed-draft-fork-unheld
page-type-slug: finding
title: "Composed draft fork unheld"
domain-slug: domain/global
---

# Claim

Three composed drafts under `dirty/maybe-keep/knowledge/` each name a change to the CODE that would make the draft cut on filter 2, and each says the change is "worth weighing before this draft is promoted" — so each is a fork nobody holds: promote the instruction, or land the code change that kills it. #18151 landed one of those three code changes without anything returning to the draft, which still stands. Nothing in the ingest loop revisits a kept document.

# Evidence

Measured 2026-08-09 in `~/instructions` and `~/code`.

Under `dirty/maybe-keep/`, `find -name '*.md'` counts 412 documents. Six match a forward-looking cut form (`would then cut`, `would cut`, `will cut`, `cuts on filter`), and three of those six use it while reasoning about something other than themselves. The three stating a pending trigger on themselves are all `-composed.md` drafts under `knowledge/`:

- `internal-redirect-guards-composed.md` — cuts once `isSafeInternalPath` and the four `getSafeRedirectUrl` copies are deleted and every caller routes through `safeInternalPath`.
- `browser-check-identity-composed.md` — cuts once a tool description or first-navigation banner names the identity and the export timestamp; a change to `packages/agents/**`.
- `filterable-select-lists-composed.md` — cuts once a check asserts a substrate advertising `data-slot="list-filter"` still renders one after a component swap; a change to `packages/shared/design/**`.

The first has fired in substance, not in letter. #18151 deleted every `getSafeRedirectUrl` — `grep -rl getSafeRedirectUrl packages` in `~/code` returns zero files — and routed every caller through the carrier, but `isSafeInternalPath` survives at `packages/shared/supabase/rr/src/auth/proxy.ts:80` as four lines delegating to it. Whether that satisfies a condition saying "deleting" is the destination owner's reading.

Separately, 21 documents match `was cut on filter` or `were cut on filter`. Those are past-tense provenance for what a seat already cut from its source, not pending triggers; an earlier count of mine conflated the two.

Not measured. I did not test the second and third triggers against their packages, and I did not establish that promotion never happens generally — only that it has not for these three, and that `domains/tasks/archivist/ingest-instructions.md` describes no stage returning to a kept document.
