---
id: 30a6e51d-b0c1-4334-bf21-d7e22909e89b
slug: a-page-placed-elsewhere-is-looked-for-at-a-path-it-cannot-stand-at
page-type-slug: finding
title: "A page placed elsewhere is looked for at a path it cannot stand at"
domain-slug: domain/pages-system
---

# Claim

`placedElsewhere` (`tools/lib/page-type-repo.ts:46-55`) derives where a page stands as `pages/<type>/<slug>.md`, a path that exists for none of the 63 pages of the eleven page types filed beside their own domains.

# Evidence

Measured 2026-08-27 against akasha at `14ab92b7f`.

Their `files:` is location-free — `akasha:**/*.readout.md` names no folder — so there is no path to derive and the page has to be looked up. `repoHolding` above it carried the same folder-anchored assumption and was repaired at `14ab92b7f`; that repair converts a false null, "this type belongs to no repository", into an honest one, "I guessed the path wrong". It is progress and not a fix.

Every page of the eleven types was taken off the index and its derived path tested with `existsSync`: 63 pages, and the derived path exists for 0 of them. `graph/edge-attribute/relation-key.graph-edge-attribute.md` would be looked for at `pages/graph-edge-attribute/relation-key.md`; `readouts/readout/five-hour-back.readout.md` at `pages/readout/five-hour-back.md`. Neither folder holds the page.

The caller is inert for a second and independent reason. `placedElsewhere` returns null where `roots[repo] === from`, and `tools/required-reading.ts` builds `roots = { ...resolveRoots(), akasha: root }` with `from = root`, so for any page type filed into akasha the target root is the tree being scanned and it bails before the path is built. All 393 page types in the registry are filed into akasha — 0 are filed anywhere else — so `placedElsewhere` returns null for every slug of every type. Called with those roots it answered null for `readout/five-hour-back`, `graph-edge/x`, `readout-scale/y`, `persona/claude`, and equally for `domain/pages-system`, which was never affected by the folder assumption at all.

So `repoHolding` was genuinely wrong for eleven of 393 page types, and the wrongness could not reach its caller. The one caller of `placedElsewhere` — `elsewhereAt`, `tools/required-reading.ts:139` — cannot reach a non-null answer at all today, so neither the fault nor its repair is observable through it.
