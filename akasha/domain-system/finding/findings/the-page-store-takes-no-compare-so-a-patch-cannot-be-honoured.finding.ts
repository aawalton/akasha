import type { Finding } from "../finding.page-type.ts"

export const thePageStoreTakesNoCompareSoAPatchCannotBeHonoured = {
  id: "01a05aec-eaaa-7572-b802-96df055882af",
  pageTypeSlug: "finding",
  slug: "the-page-store-takes-no-compare-so-a-patch-cannot-be-honoured",
  domainSlug: "workspace-package/pages-query",
  claim:
    "The deleted package named a page by page type and name and sent the store the keys to change. The store that replaced it takes a path and a whole file body and offers no compare, so nine of its write names cannot be honoured. `@akasha/pages-query` refuses each of them by name rather than reading a page, changing some keys and writing the whole body back.",
  evidence:
    "The old service took `POST /write/<page-type>/<name>` carrying `{writer, values}` and answered `{ok, at}`; the store takes `POST /write` carrying `{writer, message, puts:[{path, content}], removes}` and answers `{commit, wrote, took}`. Two things follow. First, nothing the store answers says where a page of a given page type stands: `/ask` returns the keys a page carries and never its path, and `/page`, `/shape`, `/page-types`, `/naming` and `/q` are all 404, so `writePage`, `removePage`, `writeRow`, `writeRows` and `removeRow` cannot place their write. Second, a patch would have to read the page, change some keys and write the whole body back; the store takes no compare, so a change landing between the read and the write would be lost and the caller would be told it won. That is why `patchPage`, `patchState`, `patchRow` and `patchRows` refuse, and why `patchPageIfMatch` never answers `won`. Separately, the page types these callers write — `workout-session`, `workout-schedule`, `coaching-constraint` — hold no pages here, as do the types they read: `session-tracking`, `daily-tracking`, `health-sample`, `set-log`, `exercise`, `web-app`. The store answers for the pages standing in akasha alone, and those page types have not moved in. `writeFiles` and `removeFiles` carry the store's own idiom and are proven: commit 79b2b86247 landed a file and 81211bd3e0 took it away, both authored by the writer the call named.",
} as const satisfies Finding
