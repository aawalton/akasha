---
id: 1f318147-0a39-5f96-b846-9e870d3ea33a
slug: imagery-direction-in-code
page-type-slug: finding
title: "Imagery direction in code"
domain-slug: domain/relationship-level
---

# Claim

Relationship-level imagery direction (closeness, wardrobe, pose per level) is authored only inside the code repository and read by a workstation command, so moving it outside that repository risks carrying only what the existing text happens to hold rather than Alan's actual intent, and risks breaking deployed workers that import the same module for its level arithmetic — baselines, points per green day, and the level-for-points function.

# Evidence

Project #18828, domain relationship-level, parent #18829, initiative harness-without-a-deploy, status someday_maybe, live-on commit.

Three objectives stood open, none met:

(1) The imagery direction for each relationship level should be authored outside the code repository. Closeness, wardrobe and pose per level are read by a workstation command alone, so nothing about them reaches production and nothing about them needs a deploy.

(2) Alan should settle the direction rather than a seat carrying over what stands. What stands was written into code, and a seat moving it elsewhere would carry his intent only where the old text happened to hold it.

(3) No deployed worker should lose the level arithmetic when the direction moves. The baselines, the points per green day, and the level-for-points function sit in the same module and are imported by workers that do reach production.

No Notes section was present on the project. No measurements, dates, commits, or file paths were recorded against it.
