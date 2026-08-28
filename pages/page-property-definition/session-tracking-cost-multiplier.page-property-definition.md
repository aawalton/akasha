---
id: a73770b7-d0fd-54b9-9d87-fa252b950084
page-type-slug: page-property-definition
title: "Session tracking cost multiplier"
defined-on-slug: page-type/session-tracking
key: cost-multiplier
type: number
expression: 'case({safety-level} == absent -> 0, {difficulty-level} == absent -> 0, {safety-gap} >= 1 -> 0, {safety-gap} >= 0 -> 1 - {safety-gap}, {safety-gap} <= -5 -> 32, {safety-gap} == -0.5 -> 1.5, {safety-gap} == -1 -> 2, {safety-gap} == -1.5 -> 3, {safety-gap} == -2 -> 4, {safety-gap} == -2.5 -> 6, {safety-gap} == -3 -> 8, {safety-gap} == -3.5 -> 12, {safety-gap} == -4 -> 16, {safety-gap} == -4.5 -> 24, otherwise -> 0)'
slug: session-tracking-cost-multiplier
domain-parent-slug: page-type/session-tracking
---

# Definition

- **Session tracking cost multiplier** — how many hours of stress capacity an hour of it takes.

# Design

A stretch rated a full level safer than it is difficult costs nothing.

An unrated safety or difficulty costs nothing rather than standing as zero.
