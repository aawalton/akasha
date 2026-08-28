---
id: 871f86fb-2e1a-5efa-a7cc-2e3c4f2ccde1
slug: design-clause-rewritten-unshown
page-type-slug: finding
title: "Design clause rewritten unshown"
domain-slug: domain/ops-cli
---

# Claim

Commits 67d4a4b75 and e5d8094d8 replaced a clause of a domain's Design with words a review wrote, without Alan seeing them.

# Evidence

The review of `domains/ops-instructions.md` on 2026-08-15 raised this against its own work. `page-types/domain.md`'s Every Changed Line reserves each changed line in a domain's Design to Alan and carries no carve-out, while `domains/role-responsibilities.md` carves out a review's removals for a role's Responsibilities alone. The reviewer's other two commits on that document, aec1b3b3f and 71abbef43, are pure removals. It reports the removal itself was warranted — `domains/ops-memory.md` already states the `--repo memory` supply, so Single Authority made one of the two drop it — and that the replacement wording was needed because the removal left "this one supplies nothing" reading against what `tools/ops/tool-forward.ts:22` does. Whether the pair should stand was not judged, here or there.
