import type { Finding } from "../finding.page-type.ts"

export const aGenericSourceFileNameCannotSurviveTheFlatLayout = {
  id: "01a06436-474c-7e3e-b326-467db9afd270",
  pageTypeSlug: "finding",
  slug: "a-generic-source-file-name-cannot-survive-the-flat-layout",
  domainSlug: "router-app/temper-web",
  claim:
    "Flattening makes every module compete in one global slug space, and a grouping folder was hiding collisions before it. `stats/types.ts` could not keep its name: `types` is already a landed module under `pages-access`, so it came in as `stats-types`. Under a grouped path the folder made it unique while the slug never was. The depth ruling is not free of renames, and a seat has to census its generic file names before writing.",
  evidence:
    "Measured 2026-09-02 carrying the temper character family into `akasha/temper/temper-web`, landed at `e8e61aa850`.\n\nThe four folders held 78 files. Checking every proposed slug against `find akasha -name '<slug>.module.ts'` before writing returned exactly one hit: `types` reaches `akasha/pages-system/pages-access/types/types.module.ts`. The other 75 module slugs were free.\n\nThe source spells it `temper/web/app/components/stats/types.ts` and five files import it as `@/components/stats/types`. Under the grouped layout the destination would have been `stats/types/types.module.ts`, whose path is unique against pages-access even though its slug is not — the collision would have been found by the write gate rather than by the census, and only once the page was handed in.\n\nIt came in as `stats-types`, which also matches what the source's siblings already did: `skills/skills-types.ts` and `companions/companions-filter-types.ts` both carry the qualifier in the file name. So the prefix is the shape the tree was already reaching for, and `types.ts` was the one file that had let its folder carry the qualifier instead.\n\nThe cost is not the rename but where it is found. A seat that flattens without a slug census meets it as a refusal partway through a batch that lands or is refused as one.\n\nGeneric names to census for before a flat landing: `types.ts`, `utils.ts`, `constants.ts`, `helpers.ts`, `index.ts`. The character family carried one; a tree carrying several would meet them one refusal at a time.",
} as const satisfies Finding
