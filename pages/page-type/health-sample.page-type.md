---
id: 6660c974-a5da-526e-8f75-72bbfbde2ae3
page-type-slug: page-type
title: "Health sample"
extends-slug: page
files: none
body-shape-slug: domain
slug: health-sample
domain-parent-slug: domain/alan-harness-tracking-source
required-reading-slugs:
  - value/health
---

# Definition

- **Health sample** — one reading a device takes of Alan's body.

# Design

Two devices record the same minutes, and both readings are kept.

Active calories are summed per device and the largest taken, never the total.

A day the wrist device was worn for part of the time undercounts.

Active calories are never stored, and the day's reading is worked out from the raw samples when it is asked for.

Whether the stream is still posting is read from when a sample arrived, never from which days carry data.

A sample stands as a row on the ESO day its stretch begins in.
