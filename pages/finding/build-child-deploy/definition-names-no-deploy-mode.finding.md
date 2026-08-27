---
id: 06665d1d-0317-55c0-8515-3f8dddc773bc
page-type-slug: finding
title: "Definition names no deploy mode"
domain-slug: domain/global
---

# Claim

`build-child-deploy`'s definition is the only one of the six that never says how the change goes live. It says "alongside its siblings", which is the child axis its subject already carries, so the line does not discriminate it from `build-child-commit`.

# Evidence

Measured 2026-08-06. The six definitions in full:

- build-child-commit — "building one child project's change, live as each commit lands."
- build-child-deploy — "building one child project's change alongside its siblings."
- build-parent-commit — "carrying one parent project's tree, each child live as its commits land."
- build-parent-deploy — "carrying one parent project's tree to production."
- build-singleton-commit — "building one standalone project's change, live as each commit lands."
- build-singleton-deploy — "building one standalone project's change and carrying it to production."

Five name the going-live mode, which is the axis the `-commit`/`-deploy` half of each slug stands on. `build-child-deploy` names the parent/child axis twice instead and the deploy not at all.

The reading that raised it drafted a replacement — "building one child project's change, live when the parent deploys the tree" — and was reversed at the door. `ops instructions edit --dry-run` passed conformance, then refused for two surfaces governing this path only where `# Definition` changes, which is why they had been conditional in the stage 1 `governs` listing and unread.

The bar it was reversed against read "no clause saying what is DONE with the thing", which caught the drafted repair, the standing text and all five siblings alike. `domains/domain-definition.md` now reads "no clause saying what the thing is for, why it is worth having, or where it sits", which a line naming the going-live mode does not trip. That wider tension is spent and nothing stands in the way of the repair.

`domains/domain.md` lists `define-definition` for exactly this case, "whenever the line is wrong, unclear, or out of shape with the family it sits in", and dispatches it to a lead. Whatever the family does, this line alone names no deploy.
