---
id: 7c22a21a-5813-551b-a31d-6a57b01b3030
page-type-slug: domain
title: "Rules engine field text"
slug: rules-engine-field-text
domain-parent-slug: domain/rules-engine-field-type
---

# Definition

- **Rules engine field text** — a field holding a run of characters.

# Design

It takes `is`, `starts with`, `ends with` and `contains`.

Two values no condition tells apart are one value to the proof.

No `contains` condition rules out another condition on its field.

# Intent

No text field takes `contains`.
