import type { Finding } from "../domain-system/finding/finding.page-type.ts"

export const commentFormsAreCopiedNotRead = {
  id: "01a04bc4-7e87-7182-a031-ca4cb17a70b8",
  pageTypeSlug: "finding",
  slug: "comment-forms-are-copied-not-read",
  domainSlug: "domain/checks-system",
  claim: "The code comment forms are now written down twice, and nothing holds the two copies together.",
  evidence:
    "The old check read its allowed forms from `pages/list/code-comment-forms.list.md`, which the boundary forbids an akasha file to reach, so the forms are inlined as a table in `no-code-comments.check.code.ts`. The outer list holds seven forms and the table honours four: two are refused deliberately because they are directives only another language parses, and the shebang is honoured by the scanner before any comment exists. That leaves a copy of somebody else's data with no edge between them. Editing the list page will not change what the check refuses, and nothing reports the drift. This resolves properly when the list itself migrates into the akasha folder and the check reads it as a page; until then the table is the authority and the outer page is stale the moment either moves.",
} as const satisfies Finding
