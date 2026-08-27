---
id: c89c8a63-225e-5d9c-b3de-892b276aaff3
page-type-slug: finding
title: "Upscale default doc conflict"
domain-slug: domain/inference
---

# Claim

`inference/CLAUDE.md` contradicts itself about where upscale runs by default: line 13 states one default (the workstation) while the file's own upscale section states the other (the cluster 3080 Ti).

# Evidence

Project #15902, domain `inference`, status `someday_maybe`, `live-on: deploy`.

Surfaced by worker-15580 during #15580's teardown; unrelated to that project and not fixed there. Needs a real rewrite reconciling the two lines — not a deletion, since both the summary line and the upscale section carry live routing meaning. Determining the actual current default requires checking the upscale render path / traffic-cop routing.

Marked low priority. May belong to sophia's image domain rather than voice — flagged for owner reassignment if so.
