---
id: 25881e12-2c99-5973-97c9-e6cecddbe2ac
page-type-slug: finding
title: "Oversized alert line reason unrecorded"
domain-slug: domain/global
---

# Claim

`ops code oversized` defaults to 400 against a 500 cap and publishes it as the ALERT line, and no live document says why. The reason is merge headroom rather than a quality bar: two concurrent edits to a file near the cap pushed it over and the merge collided, so the line forecasts a future collision rather than reporting a present state — which is also why it cannot be a check. Anyone re-deriving it from the artifacts reads a quality threshold awaiting enforcement.

# Evidence

Read against `~/code` at `13135651993c19af09ce41b6295264191071d3c1`, which is `origin/main`.

`packages/infra/workspace/cli/src/code/oversized.ts:17` sets `const DEFAULT_THRESHOLD = 400`. Line 39 composes the help text: "The default threshold (400) is the ALERT line; the hard CAP for code files is 500. Files past the cap are flagged so a reader sees which are merely long vs. actually over the limit." That says what the line is, not why it sits at 400.

The cap it stands under is real and separate: `packages/infra/checks/src/lib/file-length-core.ts:23-25` caps `.ts`, `.tsx` and `.lua` at 500, and `check-file-length` enforces it.

Neither the verb's source nor the check carries the reason. A grep of `oversized.ts` and `check-file-length.ts` for "headroom" or "merge" returns only two unrelated comments about the merge-queue pre-gate sharing the core module.

The reason is recorded in exactly one place, `dirty/skills/code-quality/findings.md:15-24` in the instructions repo, which is under quarantine and queued for removal: "The 400 line is **merge headroom**, not a soft quality bar. Two concurrent edits to a file near the 500 cap frequently pushed it over, and the merge collided; restructuring proactively made room for growth so that stopped happening. That is also why it could not be a check — a check fires on a present state, and this forecasts a future collision."

That record names `knowledge/code-file-length.md` as one of the places not carrying it. `dirty/knowledge/` is now empty, so that document is gone too, and nothing under `domains/` mentions `code-file-length`.

The line is neither validated nor refuted: nothing counts the merge collisions it was set against, so no artifact says whether 400 is still the right number.

Filed so the reason outlives the sweep of the one file holding it. Found ingesting `dirty/questions/code-repo-quality-checks.md`, now removed.
