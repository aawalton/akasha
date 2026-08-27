---
id: 4d1c6a3e-50dd-4831-8681-6053c64d11e3
page-type-slug: domain
title: "Master plan gate"
slug: master-plan-gate
domain-parent-slug: page-type/check
---

# Definition

- **Master plan gate** — a check run on a change to see if it can go forward.

# Design

Only a gate runs a check that judges its author.

A gate sees what the same act removes from another repository.

# Intent

A gate runs a check only on the files a patch changes.
