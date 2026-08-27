---
id: 1decc13e-bf73-589b-a978-96dfce6909cc
page-type-slug: finding
title: "Run ruling fails on main"
domain-slug: barred-meaning/project
---

# Claim

A test in the projects CLI fails on main, and has been failing long enough that a project branching off it inherits a red suite it did not cause.

# Evidence

`packages/alanwalton/projects/cli` fails `runRuling — a failed row write sends nothing`. Reported 2026-08-06 by the seat delivering project #17952, which found it failing identically on its own branch and on main, touched none of it, and landed green in CI.

What makes it worth filing rather than mentioning: a failure present on both sides of a branch is invisible to every instrument that compares them, and every seat that meets it has to establish for itself that it is pre-existing before it can rule out having caused it. The cost is paid once per seat rather than once.
