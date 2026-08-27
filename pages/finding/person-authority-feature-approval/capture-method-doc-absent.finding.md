---
id: 2b276496-8185-5f89-b3ce-dc32fd675f2d
page-type-slug: finding
title: "Capture method doc absent"
domain-slug: domain/person-authority-feature-approval
---

# Claim

`packages/alanwalton/feature-requests/src/cli/registry.ts` names a document that is not there: its header says the namespace "Backs the capture method in `packages/alanwalton/feature-requests/docs/feature-request-capture.md`", and the package has no `docs/` directory at all.

# Evidence

Read while landing #18394, which added `feature-request approve` to that same registry.

`ls packages/alanwalton/feature-requests/` returns `src` alone, and a search for `feature-request` across every markdown file in the code repository returns nothing, so no file of that name sits elsewhere under another path.

The comment has stood since before #18394. What it points at is where a reader would look to find that an approval is now recorded with `ops feature-request approve --issue <id> --approver <userId>` rather than flipped by hand.
