import type { Finding } from "../finding.page-type.ts"

export const aReservedWordIsALegalSlug = {
  id: "01a04ff1-a985-7b7e-a468-0af7ba2f2a94",
  pageTypeSlug: "finding",
  slug: "a-reserved-word-is-a-legal-slug",
  domainSlug: "domain/pages-system",
  claim:
    "A page's exported const is named by `exportedAs(slug)`, but some legal slugs have no legal name: `import`, `default`, `class`, `function` and `new` are lower-kebab-case and reserved words both. Such a page cannot be named for its slug, and nothing refuses it, because the rule that a page is one exported object named for its slug is enforced for `check`, `folder-shape` and `name-format` pages alone.",
  evidence:
    "`exportedAs` turns a slug into an export name with `slug.replace(/-([a-z0-9])/g, (_, one) => one.toUpperCase())`, so the slug `import` yields the name `import`, and `export const import` does not parse.\n\nThe graph system's `import` edge kind meets this. It is written `export const importEdge`, which loads because `firstValueIn` in `index-entries.module.code.ts` takes the first object-valued export whatever it is called. The strict lookup `mod[exportedAs(slug)]` binds only where a runner resolves code by name: `checking.module.code.ts` for checks, and the folder-shape and name-format loaders.\n\nSo the page loads and answers, while `page.page-type.ts`'s departure — a page is one exported object, named for the page's slug — is false of it. No check judges the export name of a page whose type has no runner.\n\n`page-named-as-stated` compares the stated slug against the file stem and the stated page type against the file tail. It never reads the export.",
} as const satisfies Finding
