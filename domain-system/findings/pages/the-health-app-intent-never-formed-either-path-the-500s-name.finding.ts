import type { Finding } from "../finding.page-type.ts"

export const theHealthAppIntentNeverFormedEitherPathThe500sName = {
  id: "01a06230-d69f-790e-a145-3ceaee721d19",
  pageTypeSlug: "finding",
  slug: "the-health-app-intent-never-formed-either-path-the-500s-name",
  domainSlug: "domain/alan-harness",
  claim:
    "The health App Intent in build 200 forms exactly one URL, `https://alanwalton.com/api/tracking/health-samples`, so the POSTs to `/api/health-samples` and `/api/health` came from some other sender. Neither path has ever been in this repository. There is no wrong address in the app to correct, and a further build would leave where the phone posts exactly as it is.",
  evidence:
    "The App Intent is in this repository, as Swift inside a bash heredoc rather than in a `.swift` file: `akasha/code-system/ios-app/ios-apps/alanwalton/shell-scripts/alanwalton-health-intent-declaration/alanwalton-health-intent-declaration.shell-script.shell.sh:47`, appended to `AppDelegate.swift` by the seam. A search scoped to `.swift` cannot see it, which is why two searches found nothing.\n\nRunning that file and its sibling `alanwalton-health-route-request` at commit `2ee5df1158`, the commit build 200 was made from at 2026-09-02T11:12:20Z, emits Swift holding `https://alanwalton.com/api/tracking/health-samples` once, `/api/health-samples` zero times and `/api/health` zero times. The emitted `URLRequest(url: endpoint)` names that one constant, so the binary forms one health URL and it is the right one.\n\n`git log --all -S'api/health-samples'` over all 23,242 commits returns only the finding filed this morning. History begins 2026-08-25, after the readings stopped on 08-23.\n\nOne endpoint constant means one sender cannot reach two addresses. `/api/health-samples` at 12:18:51 and `/api/health` at 12:19:48 are therefore two senders or one hand at a keyboard. `/api/health` is the liveness path, which is what a second guess at an ingest address looks like.\n\nThe App-side shape fitting the silence better: `perform()` reads the per-device credential from the Keychain before any query, and where none is there it returns `No usable device credential on this device` and sends nothing. That makes no request and so no pod line, which is what 08-23 onward looks like. Four device-secret refusals of shape `absent` at 12:11:33 sit in that window.",
} as const satisfies Finding
