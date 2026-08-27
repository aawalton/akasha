---
id: 02b6dfae-5d57-56b1-a491-3dc33684e841
slug: image-allowlist-keyed-by-name-not-url
page-type-slug: finding
title: "Image allowlist keyed by name not URL"
domain-slug: domain/global
---

# Claim

An image allowlist keyed by a name, where two names can spell one image URL, is reachable only for whichever name resolves first — so the second name's list is never read and can say anything.

# Evidence

`IMAGE_TOOLS` in `packages/infra/workflow-dsl/src/dsl/images.ts` is keyed by `IMAGES` key, while `resolveImageKey` in `check-image-tools` matches on the image URL and returns the first key that matches. `BUN`, `BUN_GIT` and `UNIVERSAL` all spell `debian:bookworm-slim`, so all three resolve to `BUN`. `flock` had been listed on `BUN_GIT` alone, where nothing could read it, while `preparation-prep` calls `flock` on `BUN`.

Project #18517 collapsed the three onto one shared list and said why in the header, so no divergence stands today. Nothing gates the shape: a fourth key spelling that URL with a different list is admitted, and the check reads it for no step. The failure is silent in the safe direction only by luck — an unreachable list that is too narrow refuses nothing, and one that is too wide allows a binary the container lacks, which fails in the pipeline rather than at the gate.

Verified on `project-18484` at 2026-08-11 by dumping the resolved maps: 11 keys over 9 distinct image URLs, three of them sharing one.
