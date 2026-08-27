---
id: 1a65552b-62d2-5f6f-9b9e-d31b8da12ce3
slug: provider-throw-routes-to-a-moved-document
page-type-slug: finding
title: "Provider throw routes to a moved document"
domain-slug: domain/design-system
---

# Claim

Two thrown errors in `@shared/design-layout` send a developer to a document that has left the code repo. `router-context.tsx` throws "Missing <LayoutRouterProvider>. Mount it in your app-shell … — see packages/shared/design/layout/CLAUDE.md § Router/Link seam", and the same for `LayoutLinkProvider`. Nothing stands at that path; the document is quarantined at `dirty/code/packages-shared-design-layout-claude.md`, queued for removal. That sentence is the whole remediation, read by whoever hit the error.

# Evidence

Measured 2026-08-08 at `~/code` on `main`, while ingesting `dirty/code/packages-alanwalton-web-app-awen-claude.md`.

The throws. `shared/design-layout/src/router-context.tsx:31` and `:78`, each the second argument to the missing-provider error. Both name the path AND a section: `§ Router/Link seam`. Two more citations of the same document sit in comments at `router-context.tsx:49` and `index.ts:36`.

The target is gone from the repo. `git ls-files "packages/shared/design/layout/CLAUDE.md"` prints nothing (exit 0 on no match, so I read the output rather than the code), `ls` on the path reports no such file, and `git check-ignore -v` exits 1 — not ignored, absent.

Moved rather than deleted. `ls ~/instructions/dirty/code/` holds `packages-shared-design-layout-claude.md`, along with three sibling `docs-*` documents from the same package. `dirty/` is the tree this sweep is removing source by source, so the referent is queued to stop existing anywhere.

What this adds over the standing records. `pages/finding/code-repo/worker-shape-remediation-doc-unreachable.finding.md` reports the inverse and says so explicitly — there the checks print NO remediation pointer, and the dead path survives only in a source comment a failing author never sees. `pages/finding/handler/context-doc-names-nothing-live.finding.md` and `pages/finding/handler/boundary-deferred-to-a-quarantined-document.finding.md` are about type-literal fields and a boot prompt, read by nobody at failure time. Here the pointer is inside the error's own remediation sentence: it is printed, it is read under pressure, and it misroutes. I opened all three before filing rather than matching on shape.

Not established: whether the `§ Router/Link seam` content was meant to move into `~/instructions` or to be reconstructed, and whether other packages' throws carry the same shape — I checked only this package.
