---
id: eb09fab3-f4cc-5151-9bf9-5f1cc20eef96
slug: home-hydration-mismatch
page-type-slug: finding
title: "Home hydration mismatch"
domain-slug: web-app/alanwalton-web
---

# Claim

alanwalton.com's `/home` page logs a React SSR hydration mismatch on `aria-controls` / `DndDescribedBy` attribute ids, because those ids are generated non-deterministically and differ between the server and client render.

# Evidence

Project #15901, domain `alanwalton-web`, status `someday_maybe`, `live-on: deploy`.

Surfaced by #15865's browser verify; pre-existing and unrelated to the keyboard wiring #15865 did. Likely source: a drag-and-drop library generating non-SSR-stable ids on `/home`. Hydration mismatches of this kind can cause subtle render divergence plus console noise.

Suggested direction, not committed work: find the dnd/aria id source on `/home` and make it deterministic across SSR and client (a stable id seed / `useId`). Named owner: astra (`alanwalton-web` `/home` is in-domain for her).
