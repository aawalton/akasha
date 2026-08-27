---
id: fe505fb0-a17d-5955-8c7b-f454ace497a1
page-type-slug: domain
title: "Rules engine normalizer"
slug: rules-engine-normalizer
domain-parent-slug: domain/rules-engine-field
---

# Definition

- **Rules engine normalizer** — what turns a run of raw text into one value out of a bounded set.

# Design

A normalizer is a list of patterns naming one value each, declared as data rather than written as code.

A pattern is a run of characters, never a regular expression.

The longest pattern the text holds names its value, and the first alphabetically where two of equal length hold.

Text holding no pattern takes a value of its own.

A field a normalizer fills is an enum, holding the values the normalizer names and that one.
