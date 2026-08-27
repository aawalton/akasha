---
id: e6fed484-248e-5a08-92c2-e5c5d258ee51
slug: builtin-display-kinds-read-by-nothing
page-type-slug: finding
title: "Builtin display kinds read by nothing"
domain-slug: domain/pages-system
---

# Claim

`BUILTIN_DISPLAY_KINDS` is named in prose as where the built-in display kinds are defined, and nothing that runs reads it. What resolves a built-in body is `selectDetailBody`, branching on the bare literals `"reader"` and `"collection"` in another package. So adding a fourth built-in to the constant changes no behaviour while reading as though it had — the restatement inverted, the copies being what run and the named authority what nothing reads.

# Evidence

Read in `~/code` on `main` at `1313565199`, ingesting `dirty/questions/code-repo-restated-values.md`.

`shared/pages-core/src/schema/detail-config.ts:3` declares `export const BUILTIN_DISPLAY_KINDS = ["default", "reader", "collection"] as const`, under a docblock calling them "the display kinds `@shared/pages-ui` resolves natively".

Its only importer is its own unit test, `detail-config.unit.test.ts:2`, which at `:105` asserts `expect(BUILTIN_DISPLAY_KINDS).toEqual(["default", "reader", "collection"])` — the constant compared against a restatement of itself, so the test passes for any edit made to both lines.

The sibling export in the same file does not read it either: `displayKindSchema` is `z.string().regex(/^[a-z][a-z0-9-]*$/)`, an open vocabulary admitting any kebab-case slug, deliberately so.

What decides a built-in body is `selectDetailBody` at `shared/pages-ui/src/components/page-detail-content-helpers.ts:30`:

    if (displayKind === "reader") return "reader"
    if (displayKind === "collection") return "collection"
    return "default"

Two bare literals, in a different package, importing nothing from the constant.

The remaining references to it are prose: `shared/pages-ui/src/capabilities/page-display-registry.ts:10` and `:44`, each naming it as where the built-in kinds are defined. The quarantined source recorded a third, at `pages/ui/src/capabilities/CLAUDE.md:19`; every `CLAUDE.md` has since left the code repository, so two remain.

The usual repair — point the readers at the constant — is available here only because no reader exists yet.
