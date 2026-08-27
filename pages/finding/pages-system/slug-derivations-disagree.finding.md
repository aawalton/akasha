---
id: da4cc5f6-393a-5551-aa1f-934e20c0a7e8
page-type-slug: finding
title: "The write path and the read path derive different slugs for a nested page"
domain-slug: domain/pages-system
---

# Claim

Two functions derive a page's slug from the same `at` string and disagree for any page under a `**` glob: `nameFromAt` returns the path relative to the glob's fixed prefix, `slugOfFilePage` the basename only. 5,413 nested pages state no slug and stand in the divergence. Seven pairs of findings carry one slug between two pages. Neither derivation is right: the basename discards what makes the address unique, and the other contains a slash, which a slug does not admit.

# Evidence

Read both functions in `packages/shared/pages/access/src/file-name.ts:82` and `file-rows.ts:164`. Counted the nested slug-less pages per directory in the memory repo and listed the duplicate basenames under `findings/`. Confirmed all 41 nested tasks state a slug and are therefore unaffected. Read the slug definition at `page-property-types/page-property-type-slug.md`. I did not run either function, and I did not establish what a collision does downstream — whether one page shadows the other, both resolve, or a write to one lands on the other.
