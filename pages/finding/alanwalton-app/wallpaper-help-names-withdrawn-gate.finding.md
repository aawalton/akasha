---
id: 4d4f8d45-7cd7-5a3e-bc4c-e80f3c844724
page-type-slug: finding
title: "Wallpaper help names withdrawn gate"
domain-slug: domain/alanwalton-app
---

# Claim

`ops persona set-wallpaper-file --help` calls the `persona-image(kind=wallpaper)` row "the pod-visible gate the reward/wallpaper watcher reads", and the watcher stopped reading it. That string is at `personas/cli/src/persona/set-wallpaper-file.ts:44`; the live gate is `persona-reward-watcher/src/decide.ts:138`, keyed on `persona-wallpaper-notification` markers instead. A seat running the help is told the delivery row closes a loop it no longer touches.

# Evidence

Measured 2026-08-08 while emptying `dirty/code/packages-alanwalton-personas-docs-wallpapers.md`, whose `## Wallpaper delivery twins` carried the same withdrawn claim and was cut on it at `5722379e0`.

The string. `rg -n "pod-visible gate" packages/alanwalton/` returns one line, `cli/src/persona/set-wallpaper-file.ts:44`, inside the verb's registry description. I confirmed it reaches a reader by running `ops persona set-wallpaper-file --help`, which prints "upserts the delivery's DB twin — one persona-image(kind=wallpaper) row per persona+level, the pod-visible gate the reward/wallpaper watcher reads".

The live gate, off executable lines rather than comments. `persona-reward-watcher/src/decide.ts:138` is `const wallpaperDue = !wallpaperNotifiedLevels.includes(standing.relationshipLevel)`. That list is `getWallpaperNotifications` (`wallpaper-marker.ts:45`), querying the `persona-wallpaper-notification` page-type on `[{ key: "persona", eq: personaId }]` at line 52, wired at `persona-reward-watcher.worker.ts:241`. No `persona-image` read appears in that path.

Why it moved: `wallpaper-marker.ts:7-15` says the old gate read the delivery row through `getPersonaImageDeliveries`, which skips rows with a null `esoDay`, so a delivered wallpaper never closed the milestone. That is an account of the change, not the evidence; `decide.ts:138` is.

Searched `~/memory/findings/` first, as its own call, over 1,513 documents: `rg -l -i "pod-visible gate|wallpaper.*watcher|persona-image.*wallpaper" findings/` returns two, and I opened both. `cover-variant-reason-outlived-the-seed.md` is a stale comment about cover-row levels, a different subject. `persona-reward-slash-names-unresolvable.md` is nearer — it establishes that `registry.ts` descriptions print to every agent running `ops --help` — but its subject is six dangling skill names, where this is a design statement the code withdrew.
