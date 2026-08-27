---
id: 3de44a4f-cf59-5b9c-8765-309c85f82b82
slug: no-live-route-to-gm-load
page-type-slug: finding
title: "No live route to gm load"
domain-slug: domain/global
---

# Claim

Nothing live routes Iris to the carrier that replaced her dead document pointers. The Tower's
authoritative world spec and progression math sit on the the-tower `game` page row, reachable only
through `ops awen gm-load --game the-tower`, and no live surface names that command: her
`readsOnLoad` is null, her conduct routes to two documents that no longer exist, and no tracked
persona spec, agent surface or live instruction document mentions gm-load anywhere.

# Evidence

Measured 2026-08-08 while emptying `dirty/code/packages-alanwalton-tower-docs-sheet-schema.md`.

The Iris persona row `019ef9f8-8237-7a6a-b3d6-7821cc814b7c`, read with `ops page show --properties`
so values came back whole rather than as placeholders:

    readsOnLoad -> null
    purpose     -> populated, and names no document and no command

Her `conduct` names `mechanics.md` and `sheet-schema.md`, which is the standing finding
`the-tower/persona-routes-to-removed-documents.md`. This one is the other half — not that the
pointers are dead, but that the live carrier has no pointer at all.

Searches, each run bare and with its exit code read:

- `rg -n "gm-load" packages/alanwalton/personas/ packages/agents/` in `~/code` — exit 1.
- `rg -n "gm-load" --glob '!dirty/**'` in `~/instructions` — exit 1. Every occurrence in that repo
  is under quarantine.
- In `~/code`, `gm-load` appears only in its own implementation under
  `packages/alanwalton/awen/src/awen/` and `packages/alanwalton/awen/core/`. The verb exists; nothing
  outside it calls for it.

The only surfaces that name the command are quarantined and queued for removal: this document's
opening blockquote ("the world spec that now lives in the-tower `game` page's `gmReference` (loaded
via `bun ops awen gm-load --game the-tower`)") and its sibling `standing-context.md`.

I ran `ops awen gm-load --game the-tower` myself: exit 0, 313 KB, carrying the Rulebook, a v33
doctrine pack, the progression ladder, the demonstration gate, the affinity schedule, the
sheet-description contract and the flat-leveling rule. The content is live; the route to it is
written nowhere that survives this sweep.

Sits beside two standing findings and duplicates neither. `the-tower/persona-routes-to-removed-
documents.md` is about the dead targets. `persona/reads-on-load-declared-empty.md` measures the key
empty on 36 of 37 rows and says outright that whether the one non-empty value is read at boot is not
established; it does not name Iris.
