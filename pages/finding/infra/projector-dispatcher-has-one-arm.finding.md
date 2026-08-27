---
id: 3a4983d4-8e19-5e11-bc7e-5e0935e0650a
slug: projector-dispatcher-has-one-arm
page-type-slug: finding
title: "Projector dispatcher has one arm"
domain-slug: domain/global
---

# Claim

`buildPageSet` in the docs projector is a one-line pass-through to `buildTypedPageSet` — identical signature, identical return, no other statement. It is the dispatcher left behind when the second arm was removed with the default page type. Nothing marks it: it compiles, has a real caller, and `ast-unused` sees a genuinely imported export. The docstring that named the choice has since been corrected, so the only record that it is vestigial is this one.

# Evidence

Read 2026-08-07 in `~/code` at `ecf5f9518`.

`packages/infra/scripts/src/docs-validator/page-input.ts` ends:

    export function buildPageSet(
      page: ParsedPage,
      userId: string,
      storyId: string | undefined
    ): Record<string, Json> {
      return buildTypedPageSet(page, userId, storyId)
    }

`buildTypedPageSet` is `function`-scoped in the same file and is called from nowhere else. `buildPageSet` is imported once, at `docs-validator/sync.ts:19`, and called once at `:184`.

WHY NOTHING REPORTS IT. The export is genuinely imported, so an unused-export pass credits it. The signature and return type match the callee exactly, so no type check narrows. `page-input.unit.test.ts` calls `buildPageSet` at `:36`, `:57` and `:60` — the tests that covered the dispatch outlived the branch it chose, and they pass through the wrapper without noticing there is one.

THE EVIDENCE THAT IT IS VESTIGIAL HAS BEEN REMOVED. The docstring above it now reads only "Build the upsert `set` for a page. `storyId` is the resolved story-relation id, written only when supplied" — no mention of choosing on page type. The file header likewise states one shape: "Every projected page takes one shape: full frontmatter pass-through." A reader arriving today sees a wrapper with no reason and no trace of one.

WHAT IT IS WORTH. One line, no measured runtime cost. It is filed because the record dies otherwise: the quarantined document that noticed it is queued for removal, and the corrected docstring took the other copy.

A SIBLING ON THE SAME PACKAGE. `pages/finding/infra/classify-kind-drives-nothing.finding.md` records a `FileKind` in this projector whose documented effects are both false. Different symbol, same shape of residue.

NOT MEASURED. Whether the projector holds other wrappers of this shape.
