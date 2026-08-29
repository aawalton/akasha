import type { Finding } from "../finding.page-type.ts"

export const nothingConstrainsASlugsCharacters = {
  id: "01a04e62-45c2-7b05-af66-b58ab1478233",
  pageTypeSlug: "finding",
  slug: "nothing-constrains-a-slugs-characters",
  domainSlug: "domain/pages-system",
  claim:
    "A slug may hold any characters at all, because the property that would say otherwise is null on every property in the corpus and is read by nothing.",
  evidence:
    '`page-property/properties/name-format-slug.relation-property.ts` stands as the property that would name a slug\'s format, and every text property in the corpus states `nameFormatSlug: null` — `page/properties/slug.text-property.ts:11` among them. Nothing reads the key: the only mentions outside the null declarations are the type and the `properties` entry on `page-property/text-property.page-type.ts`. So `slug` carries `max: 100` and no format, and its one invariant is about uniqueness rather than shape. The file name does not close the gap either. `page/page-file-name.module.code.ts:1` is `/^(.+)\\.([a-z0-9-]+)\\.ts$/`, which constrains only the page type tail; the stem is `(.+)`. `page-named-as-stated` binds the stem to the stated slug but imposes no shape on either, so a page stating `slug: "Some Thing"` in a file named `Some Thing.finding.ts` agrees with itself and passes. The kebab rule exists only at `tools/lib/finding.ts:16`, which serves the markdown corpus and is not reached from the akasha folder. I did not test such a page through the door; the claim is read off the checks and the regex rather than measured by landing one. I did not check whether any name format page exists to point `nameFormatSlug` at, so whether this is an unfilled property or an unbuilt one is open.',
} as const satisfies Finding
