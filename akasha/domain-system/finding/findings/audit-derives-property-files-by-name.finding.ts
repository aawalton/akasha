import type { Finding } from "../finding.page-type.ts"

export const auditDerivesPropertyFilesByName = {
  id: "01a04bc4-7e87-7fcd-ae2b-4eff54d0b660",
  pageTypeSlug: "finding",
  slug: "audit-derives-property-files-by-name",
  domainSlug: "domain/checks-system",
  claim: "Audit finds property files from a hardcoded list of two property names rather than from what a property is, and it is now the only place in the folder that does.",
  evidence:
    "`everyFileIn` appends, for each indexed page, the files the page's `code` and `test` properties imply, taking those two names from `HELD_IN_A_FILE` in `checking.module.code.ts`. The reason it was written that way is gone. The index derives the same set from what a property is: `filePropertiesIn` collects every `page-property-type` page whose `kind` is `file`, `pathsOf` files a path entry for each such property a page states, and `filePropertiesAt` reads them back out of the schema index in one directory read. Both checks that landed today call `filePropertiesAt` — `file-has-its-page` and `page-property-has-its-file`. So there are two authorities for the same set and audit alone still states its copy. Checked against the tree they agree, `code` and `test` being the only file-kind properties. The day a third is added the index files it, both checks honour it, and audit silently stops judging those files, with nothing reporting the split.",
} as const satisfies Finding
