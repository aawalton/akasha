import type { Finding } from "../finding.page-type.ts"

export const twoPropertiesKeyedEvidenceFrozeFindingCreation = {
  id: "01a065a8-291d-7023-9b90-e34cf9cb2aa5",
  pageTypeSlug: "finding",
  slug: "two-properties-keyed-evidence-froze-finding-creation",
  domainSlug: "domain/akasha-migration",
  claim:
    "A page property is looked up by its key with no page type named, though a key is unique only within one page type. A file property keyed `evidence` landed beside the text property keyed `evidence` every finding carries, and finding creation then failed for seven hours. Renaming the newcomer's file and slug did not lift it; only renaming its key did.",
  evidence:
    "Measured 2026-09-03 on the akasha checkout.\n\n`922023ce8b` at 22:56:00 added a file property under `learn-everything-topics/properties/` keyed `evidence`. `findings/properties/evidence.text-property.ts` had held that key since `01a04bc5`. Each is legal alone: `slug.text-property.ts:17` reads that a slug is unique among the pages of its page type, and these are two page types.\n\nI counted the finding pages created under `findings/pages/`: 37 in the half hour to 22:56:00, and 1 after, at 22:57:35. Retirements kept landing all night, because a deletion states no property, and that is why seven hours went by with nobody reading the outage off the commit log.\n\n`index-entries.module.code.ts:228` keys `filePropertiesAt` on the key alone, and `pathsOf` at line 71 looks a page's own key up in that map. A finding's evidence prose therefore became the extension of a beside-file path. `git cat-file --batch` reads one path per line, so evidence spanning paragraphs split into several requests, the answers desynchronised, and `page-property-has-its-file` threw at `commit-reading.module.code.ts:163` rather than judging. Single-line evidence made one long request and a plain refusal, which is how the 22:57:35 finding got in.\n\n`4e034dbfe7` renamed the newcomer's file and slug to `topic-evidence` and left its key `evidence`, so the shadow survived while the commit message read as a fix. `cac81d6150` renamed the key over 34 files. This finding is the write that proves it.",
} as const satisfies Finding
