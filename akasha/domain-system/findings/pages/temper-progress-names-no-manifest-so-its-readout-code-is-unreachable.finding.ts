import type { Finding } from "../finding.page-type.ts"

export const temperProgressNamesNoManifestSoItsReadoutCodeIsUnreachable = {
  id: "01a06230-b156-7bba-923f-09fa6e74fced",
  pageTypeSlug: "finding",
  slug: "temper-progress-names-no-manifest-so-its-readout-code-is-unreachable",
  domainSlug: "domain/temper-progress",
  claim:
    "`inboxes-temper-tasks` is one of Alan's five inboxes and its code is the only one of the five nothing outside its own folder can import, because `temper-progress` is a domain rather than a workspace package. The reading script names the tracking key a second time to get around this.",
  evidence:
    "Measured 2026-09-02. `akasha/temper/temper-progress/temper-progress.domain.ts` is a `domain` and names no `manifest`, so no `package.json` is written for it and there is no specifier reaching `akasha/temper/temper-progress/readouts/inboxes-temper-tasks/inboxes-temper-tasks.readout.code.ts`. `find akasha/temper -maxdepth 2 -name package.json` answers thirty-odd packages and none of them is this one.\n\nThe other four inbox readouts sit under `akasha/readout-system/readout/readouts/` and each is named by `akasha/readout-system/package.json`, so `readouts/inbox-reading.ts` imports `tasksIn`, `textsIn`, `lowestIn` and `fetchOpenQuestions` by name.\n\nWhat the reading script does instead: it holds `const TEMPER_TASKS_KEY = \"inbox-temper-tasks\"` and reads the number with `statedAt`, the same reader the temper module uses. So the reader is not spelled twice; the key is. If temper renames that key on its own page the reading goes silently to null, and a readout answering null is left out of the group rather than refused, so the tile would show four rings.\n\nWhat would close it: a manifest on `temper-progress`, which turns the page from a domain into a workspace package, or the readout moving to `readout-system` beside the other four. The first is temper's to decide. The second would take a reading of Alan's game tasks out of the domain that owns them.\n\nThe call taken in Alan's absence: the key spelled twice, with this finding beside it, rather than a workspace package created inside temper while migrating Alan's inboxes.",
} as const satisfies Finding
