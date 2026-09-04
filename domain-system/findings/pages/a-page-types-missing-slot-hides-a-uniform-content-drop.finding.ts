import type { Finding } from "../finding.page-type.ts"

export const aPageTypesMissingSlotHidesAUniformContentDrop = {
  id: "01a06a1c-4d90-7b3e-9f21-6c80a7f31d55",
  pageTypeSlug: "finding",
  slug: "a-page-types-missing-slot-hides-a-uniform-content-drop",
  domainSlug: "domain/akasha-migration",
  claim:
    "A field every old page carried and no new page type has a slot for reports as 27 separate losses, which reads like a migration defect and is not one. All 27 old `.cluster-service.md` pages carried a `title`. `ClusterService`, `Service`, `Domain` and `Page` declare no title or name property between them. The 20 cluster services born in the new system never had a title, so restoring it for 27 of 47 would invent structure rather than carry content.",
  evidence:
    "Measured 2026-09-03 on the akasha checkout, over the 27 `*.cluster-service.md` files deleted but uncommitted under `infra/k8s/src`, recovered with `git show HEAD:<path>`.\n\nEvery one carries a `title` in front matter. A per-file check of the old fields against the new TypeScript pages found `kind`, `namespace`, `resource-name`, `slug`, `page-type-slug` and `id` carried on all 27, and `domain-parent-slug: page-type/cluster-service` carried as membership in the page type's own `partSlugs`. Only `title` and, on four pages, definition or section text failed. The four were fixed; `title` was not, because there is nowhere to put it.\n\nThe nearest candidate is `text-property/name`, listed in `domain.page-type.ts` partSlugs. Its own definition reads \"what a directive is called\", and it is reached through a directive's `name` field, not a page's. It is not a title slot.\n\nMost titles are the slug in start case and lose nothing. Six are not derivable from the slug: GoTrue, PostgREST, PgBouncer, NVIDIA device plugin, DDNS headscale, Postgres CNPG. That capitalization is the whole of what the removal costs, and it survives nowhere else.\n\nThe trap is the arithmetic. A uniform drop scales with the file count, so a per-file report makes one structural decision look like 27 defects and buries the real ones under them. Before the title arm was separated out the run read 27 UNPROVEN of 27; after, 4 of 27, and those four were carryable. Sorting by distinct cause rather than by file is what made the real gaps visible.",
} as const satisfies Finding
