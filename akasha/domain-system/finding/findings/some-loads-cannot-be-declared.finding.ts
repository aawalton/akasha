import type { Finding } from "../finding.page-type.ts"

export const someLoadsCannotBeDeclared = {
  id: "01a0533f-2c7d-7823-85dd-490c3514530f",
  pageTypeSlug: "finding",
  slug: "some-loads-cannot-be-declared",
  domainSlug: "domain/graph-system",
  claim:
    "Six page types now say which module loads their pages, and the graph works that edge out from the saying. Three loads stand outside it. One is handed its path and can load any page of any type, so saying it would give one module an edge to every page there is. One loads a file it wrote and then deleted, which never stood in the corpus at all. Two name what they load in a written string the reader does not follow.",
  evidence:
    "`file-property.context-warrant.code.ts:20` is handed `path` as an argument of `statedIn(root, path, slug)` and narrows it only by `namedIn(path)` parsing and the type standing among those known, so what it may load is every page there is. Saying that needs the property on `page` itself, which this domain's `Never Depend On Everything` rule refuses. `index-entries.module.code.ts:52` loads `held.page.ts`, written at `:51` under a directory made at `:48` and taken away at `:56`; `index-entries.module.ts:14` states that a page's body can be loaded after the file it came from is gone, so there is no target and never was, and any check counting these sites must let this one stand. `landing.module.code.ts:104,115` hand `loadFrom` two constants written out at `:48` and `:50`, so those two edges do stand in the text, and reading a constant beside its use would recover them with nothing declared at all.",
} as const satisfies Finding
