import type { Finding } from "../finding.page-type.ts"

export const fourWebAppsEachCarryTheirOwnCopyOfTheErrorRoute = {
  id: "01a05f89-67a1-7da3-a1d3-8828abd8e1e7",
  pageTypeSlug: "finding",
  slug: "four-web-apps-each-carry-their-own-copy-of-the-error-route",
  domainSlug: "page-type/router-app",
  claim:
    "smilingjenny raised error reports her own site never answered: her root renders the capture installer, but no api/errors route was registered, so every report met a 404. Answering her makes a fourth copy of one route, three apps carrying a byte-identical file and alanwalton's differing only by the Capacitor CORS headers Jenny needs too.",
  evidence:
    'smilingjenny/web/app/root.tsx:40 renders ErrorCaptureInstaller with app="smilingjenny" and :2-3 import it from @akasha/errors-client, but smilingjenny/web/app/routes.ts named no api/errors route, so the POST had nowhere to land. ErrorReportSchema already names smilingjenny among the apps a report may come from, so those reports were well formed and simply unanswered.\n\nThe md5 of app/routes/api.errors.ts is a7f1285c9ebd43ef13ff932071c41f87 for audhdalan, temper and archive-of-worlds alike. alanwalton\'s is b70093e8f26a4b722cc91772a27ac2d9, differing by corsHeaders() for capacitor://localhost on the loader, the action and the 405. Jenny ships me.smilingjenny.app through Capacitor, so hers was taken from his rather than from the three.\n\nNothing about an app is written into the file: the app is read from the parsed payload, so the four copies differ in no value at all. Her package.json gained @akasha/errors-core and @akasha/pages-access, which the other three already declare. Landed as eb7254240d.\n\nThe duplication sits outside akasha, where no-rule-in-two-files does not reach. Consolidating these into one handler is owed when the routes move in, and a fifth copy should not be written before then.',
} as const satisfies Finding
