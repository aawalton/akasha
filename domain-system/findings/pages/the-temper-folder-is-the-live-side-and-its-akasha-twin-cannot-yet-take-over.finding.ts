import type { Finding } from "../finding.page-type.ts"

export const theTemperFolderIsTheLiveSideAndItsAkashaTwinCannotYetTakeOver = {
  id: "01a06583-5774-7000-bb8f-679db9397ef7",
  pageTypeSlug: "finding",
  slug: "the-temper-folder-is-the-live-side-and-its-akasha-twin-cannot-yet-take-over",
  domainSlug: "domain/temper",
  claim:
    "The top-level `temper/` folder is the live side and `akasha/temper/temper-web` is the unfinished twin, so this folder is accretion work rather than a sweep. A deploy of tempereso.com builds from `temper/web`, and the cluster service reads its manifests from a file in that same folder. The twin holds no routes folder at all: 36 of the 46 live route modules reach no file inside akasha. Ablating first takes the site down.",
  evidence:
    'Measured 2026-09-02 over the 516 tracked files of `temper/`: web 372, player-completion 85, scripts 58, and one symlink to the lua-compiler at the repository root. The 6,428 files on disk are build output, ignored by `temper/web/.gitignore:4` and `.gitignore:12`, and `git status --porcelain temper/` answers nothing.\n\n`akasha/service-system/web-apps/pages/temper-web.web-app.ts:8` carries `sourceDirectory: "temper/web"` beside the host names tempereso.com and www.tempereso.com, and `web-app-reading.module.code.ts:172` reads that property, so a deploy truly builds from the folder. `temper-web.cluster-service.ts:14` names `temper/web/temper-web.cluster-service.code.attachment.ts`, a file of 8,778 bytes changed the same day. `manifest-code.text-property.ts:20` already admits this as a stopgap: the file a cluster service names there is outside akasha.\n\nThe twin is not ready. `akasha/temper/temper-web` holds 582 files but no routes folder, while `temper/web/app/routes` holds 46 modules; only 10 of the 46 names reach any file inside akasha. Nothing imports `@akasha/temper-web` except its own `package.json`.\n\nThe live folder is already a hybrid consumer, which is why it works: `temper/web` imports `@akasha/temper-player-completion` 333 times, `@akasha/temper-companions-core` 326 and `@akasha/design-primitives` 313.\n\nSo the order is to carry the 36 routes and the 38 files that reach no counterpart, repoint `sourceDirectory` and `manifestCode` onto akasha, prove a deploy, and only then ablate.',
} as const satisfies Finding
