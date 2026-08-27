---
page-type-slug: page-type
title: "Temper Character Build"
id: 019dbb6c-2001-7d3b-ab99-0a96e5a3fdf7
extends-slug: page
files: memory:**/*.character-build.md
body-shape-slug: empty
named-for: "{build-name}"
owner-slug: account-page
slug: character-build
plural-slug: character-builds
domain-parent-slug: domain/temper-player-character
---

# Definition

- **Temper Character Build** — one saved arrangement of a character's gear, skills and stats.

# Design

A build is the arrangement rather than the character wearing it, so one character can hold several and one build can be shared.

A build's hash states the arrangement, and two builds with the same arrangement carry the same hash.

A build's file is named for the name its author gave it, because the hash is longer than a name may be and its differing bytes fall past that bound.
