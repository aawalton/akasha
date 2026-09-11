import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const someLoadsCannotBeDeclared = {
  id: "01a0533f-2c7d-7823-85dd-490c3514530f",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "some-loads-cannot-be-declared",
  domain: "domain/graph",
  claim:
    "Six page types now say which module loads their pages, and the graph works that edge out from the saying. Three loads fall outside it. One is handed its path and can load any page of any type, so saying it would give one module an edge to every page there is. One is handed a body rather than a path, so what it loads was never among the pages at all. Two name what they load in a written string the reader does not follow.",
  evidence:
    "`file-property.context-warrant.code.ts` takes `path` as an argument of `statedIn(root, path, slug)` and hands it straight to the `loadFrom` that `createRequire` made, so what it may load is every page there is; its caller `fileProperty` narrows that path only by `partedIn` parsing and the page type being among those known. Saying that needs the property on `page` itself, which this domain's `Never Depend On Everything` rule refuses. `page-value.module.code.ts` loads through `declaredIn`, which is handed a body as a string and never a path: it transpiles that body with `Bun.Transpiler` and runs the result through `new Function`, so no file and no page is there for an edge to point at. Its module page states both that a page's body can be loaded after the file the body came from is gone and that a body is loaded without a file being written, so any check counting these sites must leave this one out. `gate-building.module.code.ts` hands `loadFrom` the two constants `CHECKING_AT` and `INDEXING_AT`, each worked out by `pathOf` from a module name written beside it, so those two edges are there in the text, and reading a constant beside its use would recover them with nothing declared at all.",
} as const satisfies Finding
