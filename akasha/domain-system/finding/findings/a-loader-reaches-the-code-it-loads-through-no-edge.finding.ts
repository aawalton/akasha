import type { Finding } from "../finding.page-type.ts"

export const aLoaderReachesTheCodeItLoadsThroughNoEdge = {
  id: "01a05047-6045-71bc-9b7f-a00907daf62c",
  pageTypeSlug: "finding",
  slug: "a-loader-reaches-the-code-it-loads-through-no-edge",
  domainSlug: "domain/graph-system",
  claim:
    "The graph cannot see the edge from a loader to the code it loads. Six sites load a module by a path worked out as the program runs, so no specifier stands in any file and no index files the edge. A check's or a test's closure leaves out the runner that produced its result, and a change to that runner reaches nothing.",
  evidence:
    '`checking.module.code.ts:83,95`, `calling.module.code.ts:77`, `landing.module.code.ts:103,114`, `warranting.module.code.ts:115`, `file-property.context-warrant.code.ts:20` and `no-refused-syntax.check.code.ts:43` each hand `loadFrom` a path built as the program runs from a page\'s own path. A written `import("./x.ts")` is read by `code-specifier` and stands in the import index; a worked-out path stands nowhere, because what would name it is absent from the file rather than merely unparsed. The old graph answered this by declaration: a page type stated `code-loaded-by`, and the loader producer drew an import edge from that module to every code file of the type, which stood on `command.page-type.md:8` and `check.page-type.md:8`. Alan holds the fix until a closure we need is stopped by it. That holds only while an answer is reported: the moment a closure is used to skip work, running more than we should is waste and running fewer is a change landing unjudged.',
} as const satisfies Finding
