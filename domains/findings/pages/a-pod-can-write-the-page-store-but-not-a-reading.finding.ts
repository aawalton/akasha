import type { Finding } from "../finding.page-type.ts"

export const aPodCanWriteThePageStoreButNotAReading = {
  id: "01a05b44-9d68-731e-8ba6-22d1817a4656",
  pageTypeSlug: "finding",
  slug: "a-pod-can-write-the-page-store-but-not-a-reading",
  domainSlug: "domain/monarch",
  claim:
    "The constraint `The reading is taken on a workstation because a pod cannot write the page store` names the wrong reason. Pods write the page store today, with a git token their secret carries. What no caller can write through the store is a reading, workstation included, because a reading is an uncommitted value and the store's only write is a commit. The reading belongs on the workstation because the file it lands in never leaves the machine that took it.",
  evidence:
    "`pages-system-service.workspace-package.ts:80` states `A pod reaches it over the tailnet`, so reach is not the bar. `alanwalton/web/alanwalton-web.cluster-service.code.attachment.ts:30-33` binds `GIT_ACCESS_TOKEN` out of the `alanwalton-secrets` secret, and four routes in that pod write pages through `@akasha/pages-query`, among them `app/routes/api.sms.webhook.ts:35` and `app/device-secret/lib/device-secrets.server.ts:49`. So a pod writes pages. What the store offers is `POST /write`, and `page-writing.module.code.ts:74-114` turns it into whole file bodies handed to `landing`, which commits. There is no route for an uncommitted value. The reading is exactly that: `readout.page-type.ts:55-56` declares `last-value` and `last-value-at` with `uncommitted: true`, `readout.page-type.ts:77` states `The reading a readout last took is carried outside the commit`, and `readout-reading.module.ts:16-22` states `A reading never reaches the commit` beside `A reading never leaves the machine that took it`. `readout-reading.module.code.ts:12-14` writes it with `mergeUncommitted` into a sidecar `.uncommitted.ts` that `.gitignore:2` ignores. The call taken: the reading was moved to the workstation and left writing through `mergeUncommitted` rather than through `POST /write`, because writing it through the store would commit a value three invariants say is never committed, once every five minutes.",
} as const satisfies Finding
