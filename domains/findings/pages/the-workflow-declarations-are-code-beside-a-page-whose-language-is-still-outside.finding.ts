import type { Finding } from "../finding.page-type.ts"

export const theWorkflowDeclarationsAreCodeBesideAPageWhoseLanguageIsStillOutside = {
  id: "01a0657f-0c53-7004-9a08-df5a406740a5",
  pageTypeSlug: "finding",
  slug: "the-workflow-declarations-are-code-beside-a-page-whose-language-is-still-outside",
  domainSlug: "domain/change",
  claim:
    "The 39 workflow templates migrated with their steps as a `declaration` file property, which is the module shape — a page saying what the code is for and a file beside it saying how. The language those declarations are written in did not come with them: every one imports a DSL from `tools/lib/workflow-dsl/`, still outside akasha.",
  evidence:
    'Each page now stands at `akasha/changes/workflow-templates/pages/<slug>/<slug>.workflow-template.ts` with `<slug>.workflow-template.declaration.ts` beside it, and the page states `declaration: "ts"`. The relative way out was lengthened from `../../tools/lib/workflow-dsl/` to `../../../../../tools/lib/workflow-dsl/`, which resolves.\n\nThey were made a page type with a file property rather than modules, because nothing imports a declaration. `module` is defined as "code reached by importing it"; a workflow declaration is gathered by a runner that discovers it. The distinction is stated as an invariant on the new page type.\n\nThe DSL is 10 files at `tools/lib/workflow-dsl/` — workflow.ts, step.ts, images.ts, types.ts, discovery.ts, inputs-hash.ts, ci-identifiers.ts, rbac-types.ts, secrets.ts and templates/. Until it moves, the declarations reach out of akasha, and `workflow-template.page-type.ts` carries that as a gap.\n\nTwo of the 39 declarations changed under this migration while it ran, when other lanes moved what they deploy: workflow-audhdalan now names `akasha/audhdalan/audhdalan-web/...` where it had named `audhdalan/web/...`. They were re-copied from source before ablation.',
} as const satisfies Finding
