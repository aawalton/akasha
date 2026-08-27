---
id: 43881586-0706-5a73-b35b-72d3ce0dd140
page-type-slug: finding
title: "A cleared field is written as a blank"
domain-slug: domain/code-quality
---

# Claim

Nothing binds how a cleared field is written, and code here clears by writing an empty string where the key should be absent. A blank is indistinguishable from a deliberately blank value, so every reader chooses which was meant, and one reader chose the worst available reading and took main red.

# Evidence

On 2026-08-11 main pipeline #27793 failed at `alanwalton-daily-tracking / recompute-points` with `git log failed (exit 128): fatal: Invalid path '/**'`.

The `apply` verb at `packages/alanwalton/personas/cli/src/persona/faucet-apply.ts`, built in project #18568, clears a field by writing `""` rather than by unsetting the key. Three persona rows — ember, astra, awen — came out of it carrying `pointsPathPrefix` present-and-empty. Athena went through the array-valued path instead and came out correct, with the key absent and `pointsPathPrefixes: []`, so the fault is the scalar route rather than the verb as a whole.

`resolvePointsPrefixes` at `packages/alanwalton/personas/core/src/git-byte-pathspecs.ts` falls through only on `undefined`, so `""` resolves to `[""]` — one real prefix. `writeTotalPointsForPersonas` at `packages/alanwalton/daily-tracking/src/totals.ts` guards `prefixes.length === 0`, which a one-element list walks past. `pathspecsForPrefix("")` then builds `:(glob)/**/*.md`, because `normalizePrefix("")` is `""`. Asked to meter a blank prefix, the reader asked git to meter the whole repository from the root, and git refused.

The same blank landed on fields that have not crashed. `faucetAggregate` is `""` on ember, athena, astra and awen, against a coherence rule admitting only `bytes`, `sum` and `count` — a refusal waiting on the next write. `earningNarrative` is `""` on 33 rows where #18568 was asked for the field to be gone. Forty fields carry the blank; one of them reached a reader that had an opinion about it.

Two documents carry this shape locally and neither generalizes it: `domains/check-review.md` says a settled verdict is absent until reached rather than standing empty, and `domains/seat-principal.md` says a principal nobody stated is absent rather than a default. `domains/seat-attribute.md` says the opposite for its own case, which is why the general claim has to name which of the two it is rather than assume.
