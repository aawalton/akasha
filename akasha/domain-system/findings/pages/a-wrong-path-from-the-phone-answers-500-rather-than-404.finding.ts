import type { Finding } from "../finding.page-type.ts"

export const aWrongPathFromThePhoneAnswers500RatherThan404 = {
  id: "01a06220-eb53-7000-8f8a-64435db74be5",
  pageTypeSlug: "finding",
  slug: "a-wrong-path-from-the-phone-answers-500-rather-than-404",
  domainSlug: "domain/alan-harness",
  claim:
    "Alan's health Shortcut posted to `/api/health-samples` and `/api/health`, and both answered 500 rather than 404. The site's catch-all page route matches `api` as a page type and the rest as a page, so an unrouted path reads as a fault in the site rather than as a wrong address. Both instruments watching the health road read the resulting silence as an outage of an ingest route that had in fact never been reached.",
  evidence:
    'The pod log carries, at 2026-09-02T12:18:51.645Z and 12:19:48.737Z: `You made a POST request to "/api/health-samples" but did not provide an `action` for route "routes/page-detail"`, and the same shape for `/api/health` against `routes/api.health`.\n\nThe ingest route is `api/tracking/health-samples` at `alanwalton/web/app/routes.ts:72`. The catch-all is `route(":pageTypeSlug/:pageHrefParam", "routes/page-detail.tsx")` at `routes.ts:8`, which matched `pageTypeSlug="api"` and `pageHrefParam="health-samples"`. That route declares no action, so React Router raised a 500 through `getInternalRouterError`.\n\n`git log --all -S\'"api/health-samples"\' -- alanwalton/web/app/routes.ts` returns nothing, so that path was never a route.\n\nThe request reached the pod. It never reached `resolveDeviceSecretContext`, never reached `upsertHealthSamples`, and never reached the page store.\n\nWhat made this hard to see is that nothing logs on the good path. `api.tracking.health-samples.ts` logs nothing on success or on an empty payload, and `device-secrets.server.ts` writes to stderr only on a refusal. So an absence of log lines was never evidence either way, and I twice treated it as evidence.\n\nTwo instruments read the same silence as an ingest outage: the arrival watchdog ruled SILENT at 242.2h, and four device-secret refusals of shape `absent` at 12:11:33 were read as ordinary probes rather than as a window that had closed seven minutes before his first attempt.',
} as const satisfies Finding
