import type { Finding } from "../finding.page-type.ts"

export const theCliLandingPathNeverRanThroughPageLanding = {
  id: "01a05c7a-b0c1-7be9-b35e-6aeaa8aa05fe",
  pageTypeSlug: "finding",
  slug: "the-cli-landing-path-never-ran-through-page-landing",
  domainSlug: "domain/akasha-migration",
  claim:
    "`repo/land/page-landing.ts` is not the akasha CLI's landing path and never was. Nothing in the tracked tree imports the file or either of its exports. `akasha write` and `akasha edit` reach `repo/land/land.ts` straight from their command attachments. Since that file held the one remaining reach into `@shared/pages-system`, it goes as dead code and the package empties without the gate being touched at all.",
  evidence:
    'A brief handed to this lane named `repo/land/page-landing.ts` as the code performing `akasha write` and `akasha edit`, to be changed last and under revert. It performs neither.\n\n`git grep` over tracked files for `page-landing.ts`, `useAkashaLanding` and `landsInAkasha` answers three lines, all inside `repo/land/page-landing.ts` itself. Its import of `patchAside` is unused.\n\nWhat does land: `ops-cli/global/write/write.command.code.attachment.ts:10` and `ops-cli/global/edit/edit.command.code.attachment.ts:6` both import `land`, `LandingRefused` and `Landing` from `repo/land/land.ts` by relative path. Eleven other callers reach `land.ts` the same way, `page-landing.ts` among them, and none reach `page-landing.ts`.\n\nThe reading agrees with most-of-the-pages-system-package-is-reached-by-nothing, filed earlier: `write/landing` is reached inertly, and `landsBy`, the one reader of the callback it registers, sits in `write/land.ts`, which nothing reaches.\n\nTwo further reaches the brief did not name. Root `tsconfig.json` carries `{ "path": "./shared/pages-system" }` as a project reference, and `bun.lock` names the workspace at two places. A workspace dropped from `package.json` alone leaves both dangling, and the lockfile shape is what stopped every web pod once before.\n\nNone of the 52 files is named by the three tsconfigs that hand-transcribe source files by literal path.\n\nThe file went at `fff1cf2304` and `akasha edit` landed this sentence afterwards, so the gate is proven by running rather than by reading.',
} as const satisfies Finding
