---
id: 6f5f3ead-fe5f-5994-9bd5-1a0c90e5cbf9
page-type-slug: page-property-definition
title: "Session tracking spend hours"
defined-on-slug: page-type/session-tracking
key: spend-hours
type: number
expression: '(hoursBetween({start-time}, {end-time}) ?? hoursBetween({start-time}, now())) * case({safety-gap} >= 1 -> 0, {safety-gap} >= 0 -> 1 - {safety-gap}, {safety-gap} <= -5 -> 32, {safety-gap} == -0.5 -> 1.5, {safety-gap} == -1 -> 2, {safety-gap} == -1.5 -> 3, {safety-gap} == -2 -> 4, {safety-gap} == -2.5 -> 6, {safety-gap} == -3 -> 8, {safety-gap} == -3.5 -> 12, {safety-gap} == -4 -> 16, {safety-gap} == -4.5 -> 24, otherwise -> 0)'
slug: session-tracking-spend-hours
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking spend hours** — what the stretch cost, its hours weighted by how far its difficulty stood above its safety.
