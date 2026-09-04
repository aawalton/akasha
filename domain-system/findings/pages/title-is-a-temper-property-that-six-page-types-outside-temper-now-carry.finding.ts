import type { Finding } from "../finding.page-type.ts"

export const titleIsATemperPropertyThatSixPageTypesOutsideTemperNowCarry = {
  id: "01a0657f-0c53-7005-b16b-a77c67c1f12e",
  pageTypeSlug: "finding",
  slug: "title-is-a-temper-property-that-six-page-types-outside-temper-now-carry",
  domainSlug: "workspace-package/pages-system",
  claim:
    "`text-property/title` is the only title property a page may carry, and it sits at `akasha/temper/temper-things/properties/title.text-property.ts`. The Monarch records, the merchants, the category rules, the views, the navs, the collection types and the workflow templates all carry a title, so seven page types outside temper now import a property out of temper's folder.",
  evidence:
    'A slug is unique among the pages of its page type, so there is exactly one page with pageTypeSlug `text-property` and slug `title`. It stands under temper-things, whose page type `temper-thing` is defined as "anything temper keeps a page for" and declares title, key, description, icon, display-order, account-page, category, category-id, companion-id, eso-character-id and parent.\n\nThe new page types reach it by relative path, for instance `../../../../temper/temper-things/properties/title.text-property.ts` from `akasha/alan/harness/monarch/monarch-records/`. `text-property/icon` was reached the same way from the new `nav`.\n\nThere is precedent for reaching across: `temper-holdings-thing` imports `captured-at` out of `temper-catalog/temper-world/properties/`. What is new is reaching *out of* temper from a domain that has nothing to do with it. Moving `title` and `icon` up to a shared place would touch several hundred temper imports, which is not a change to make while the temper lane is running.',
} as const satisfies Finding
