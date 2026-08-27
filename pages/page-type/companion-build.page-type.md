---
page-type-slug: page-type
title: "Temper Companion Build"
id: 019db750-17d1-7914-b0e0-5ffe0d71bb50
extends-slug: page
files: akasha:**/*.companion-build.md
body-shape-slug: empty
named-for: "{build-name}"
owner-slug: account-page
slug: companion-build
plural-slug: companion-builds
domain-parent-slug: domain/temper-player-companion
---

# Definition

- **Temper Companion Build** — one saved arrangement of a companion's gear, skills and stats.

# Design

A build is the arrangement rather than the companion wearing it, so one companion can hold several and one build can be shared.

A build's hash states the arrangement, and two builds with the same arrangement carry the same hash.

A build's file is named for the name its author gave it, because the hash is longer than a name may be and its differing bytes fall past that bound.
