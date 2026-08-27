---
id: 274809bb-f564-5fde-8772-8a3fdf1c2f4d
page-type-slug: finding
title: "Escalation bound at two stages"
domain-slug: barred-meaning/project
---

# Claim

The singleton-deploy task binds "escalate what you did not cause" twice, once for `~/code` at stage 3 and once for the instructions tree at stage 7.

# Evidence

Slices 6 and 22 of `tasks/projects/build-singleton-deploy.md` state one claim at two stages, differing only in which tree the standing failure sits on. The estate carrying standing failures was verified: a full `ops instructions run-checks` exits 0 with standing `links-resolve` and `terms-in-reach` advisories.

Whether the two are one instruction is a judgment about whether the trees differ enough to need saying twice.
