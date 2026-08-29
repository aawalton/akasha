import type { Finding } from "../finding.page-type.ts"

export const aLineNamesWhatNoWarrantReaches = {
  id: "01a04dc7-b9e1-72b5-a174-f2166ed7bb1c",
  pageTypeSlug: "finding",
  slug: "a-line-names-what-no-warrant-reaches",
  domainSlug: "domain/context-warrant",
  claim:
    "A page's lines name terms that stand on other pages, and no warrant reaches them. Every file warrant derives from an edge the structure already holds, and a term used in a sentence has no such edge, so the reading a line depends on to be read correctly is warranted by nothing.",
  evidence:
    "The six file warrants all follow edges the corpus already carries: the file itself, the page that names it among its parts, its page type and the chain that extends, the type of each property it states, the page behind a property's own file, and the page behind each import. Every one of those is a slug already written somewhere. What a line says is not. The domain page type's own design reads `What makes a page a domain is its page type, never the folder it sits in`, which names page, domain and page type as terms in prose, matching no slug in any field. The removed required-reading-slugs property was the place this case used to live, and its design said a domain may name one below it in the tree, which is exactly the reading structure does not give: ancestors come free through the parts edge and descendants and siblings do not. Removing that property closed a list nobody maintained and left this case with nowhere to go. Two detection rules were considered. A slug written literally in a line is precise and computable, and almost no line in the corpus does it, so the warrant would derive close to nothing. A term matched against the definitions of other pages is what the lines actually do, and needs a matching rule that does not exist, with prose words like page and file and code standing as definitions and as ordinary English in the same sentence. The old system carried context-mention and context-reference for this, which is prior art worth reading before choosing. Recorded rather than fixed because a warrant that cannot be derived is worse than no warrant: it would state an obligation the system could not compute, and the reason the lists were removed was that nothing could check whether they were right.",
} as const satisfies Finding
