---
id: 9ba00056-7b99-5b21-8835-3652c8290bb2
slug: build-uses-throwaway-checkout
page-type-slug: finding
title: "Build uses throwaway checkout"
domain-slug: host/macbook
---

# Claim

The macbook build runs in a checkout it creates and throws away, so there is no shared working tree that can go dirty, need comparing, need clearing, or need arbitrating between runs.

# Evidence

Project #18039 (status `someday_maybe`, `live-on: deploy`, domain `macbook`, tag `author:amy`, created 2026-08-06, updated 2026-08-10). The row's Objective and Notes sections were both empty; its only captured content was its title: "The macbook build works in a checkout it creates and throws away, so there is no shared working tree to go dirty, be compared, be cleared, or need arbitrating." It was never defined into an objective — no scope, deliverable or acceptance test was written against it.
