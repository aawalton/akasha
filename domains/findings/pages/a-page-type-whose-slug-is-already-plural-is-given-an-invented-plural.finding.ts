import type { Finding } from "../finding.page-type.types.ts"

export const aPageTypeWhoseSlugIsAlreadyPluralIsGivenAnInventedPlural = {
  id: "01a08808-8108-7597-bda6-c1981d55ad7a",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-page-type-whose-slug-is-already-plural-is-given-an-invented-plural",
  domain: "text-property/plural-slug",
  claim:
    "`pluralSlug` is required of every page type, and a page type whose slug is already plural has nowhere to go but a coined word. The folder rule then asks the folder to take that coined word, so two folders that read correctly today are refused in favour of names that read worse.",
  evidence:
    '`pages/types/page-type.page-type.ts` declares `{ pageProperty: "text-property/plural-slug", required: true, many: false }`. `domains/properties/plural-slug.text-property.ts` states the invariant `A folder with a page that states a plural slug takes its name from that plural slug`, and `namingOver` in `checks/code-checks/pages/folder-matches-a-shape/folder-matches-a-shape.code-check.code.ts` reads `names[1] ?? names[0]`, so the plural is preferred over the slug wherever a page type states one.\n\nTwo page types have a slug that is already plural. `seat-system/agent-settings/agent-settings.page-type.ts` states `slug: "agent-settings"` and `pluralSlug: "agent-settings-documents"`. `seat-system/seat-conditions/seat-conditions.page-type.ts` states `slug: "seat-conditions"` and `pluralSlug: "seat-conditions-documents"`. Neither coined word is used for anything but satisfying the required property.\n\n`folder-matches-a-shape` refuses both folders on the naming clause alone: `it is named `agent-settings` rather than `agent-settings-documents`, what `agent-settings` calls its folder`, and the same sentence for `seat-conditions`. Every other clause of `a-page-type-with-its-parts` clears, because `pages` and `properties` are the two subfolders each holds and both are held names.\n\nSo the only mend the check offers is to rename `seat-system/agent-settings/` to `seat-system/agent-settings-documents/` and `seat-system/seat-conditions/` to `seat-system/seat-conditions-documents/`. The folders are right and the coined plurals are what is wrong. Either `pluralSlug` stops being required where a slug is already plural, or a page type may state that its slug and its plural are the same word, or the naming rule reads the slug where the plural is a coinage. Nothing here says which, and no folder should move until one is chosen.',
} as const satisfies Finding
